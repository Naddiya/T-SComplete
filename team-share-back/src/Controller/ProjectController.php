<?php

namespace App\Controller;

use App\Entity\Follow;
use App\Entity\Project;
use App\Repository\TagRepository;
use App\Repository\FollowRepository;
use App\Repository\UserRepository;
use App\Repository\SkillRepository;
use App\Repository\StatutRepository;
use App\Repository\TechnoRepository;
use App\Repository\ProjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


/**
 * @Route("/project", name="project")
 */
class ProjectController extends AbstractController
{
    /**
     * @Route("/index", name="_index", methods={"GET"})
     */
    public function index(ProjectRepository $projetcRepository)
    {
        // Récupére tous les projets du plus grand au plus petits nombres de likes
        $projects = $projetcRepository->findBestProjects();

        // Crée une response au format json
        $response = new JsonResponse($projects);

        return $response;
    }

    /**
     * @Route("/index/title", name="_index_title", methods={"GET"})
     */
    public function indexByTitle(ProjectRepository $projetcRepository)
    {
        // Récupére tous les projets du plus grand au plus petits nombres de likes
        $projects = $projetcRepository->findProjectsByTitle();

        // Crée une response au format json
        $response = new JsonResponse($projects);

        return $response;
    }

    /**
     * @Route("/index/createdat", name="_index_createdat", methods={"GET"})
     */
    public function indexByCreatedAt(ProjectRepository $projetcRepository)
    {
        // Récupére tous les projets du plus grand au plus petits nombres de likes
        $projects = $projetcRepository->findProjectsByCreatedAt();

        // Crée une response au format json
        $response = new JsonResponse($projects);

        return $response;
    }

    /**
     * @Route("/search/{title}", name="_search", methods={"GET"})
     */
    public function indexBySearchTitle($title, ProjectRepository $projetcRepository)
    {
        // Récupére tous les projets du plus grand au plus petits nombres de likes
        $projects = $projetcRepository->findProjectsBySearchTitle($title);

        // Crée une response au format json
        $response = new JsonResponse($projects);

        return $response;
    }

    /**
     * @Route("/{id}", name="_show", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function show(ProjectRepository $projetcRepository, $id)
    {
        // Récupére un projet en fonction de son id
        $oneProject = $projetcRepository->findOneProjectById($id);

        // Crée une response au format json
        $response = new JsonResponse($oneProject);

        return $response;
    }

    /**
     * @Route("/new", name="_new", methods={"POST"})
     */
    public function new(Request $request, EntityManagerInterface $entityManager, TagRepository $tagRepository, StatutRepository $statutRepository, UserRepository $userRepository, SkillRepository $skillRepository, TechnoRepository $technoRepository)
    {
        // Récupére le contenu du json reçu
        $jsonContent = $request->getContent();

        // Transforme le json en tableau
        $jsonContentArray = json_decode($jsonContent, true);

        // Crée un nouveau projet vide
        $newProjectObject = new Project;

        // Hydrate le nouveau projet en fonction du tableau
        $newProjectObject->setTitle($jsonContentArray['title']);
        $newProjectObject->setDescription($jsonContentArray['description']);
        $newProjectObject->setContent($jsonContentArray['content']);
        $newProjectObject->setImage($jsonContentArray['image']);
        $newProjectObject->setStartedAt($jsonContentArray['startedAt']);
        $newProjectObject->setNbCollaborator($jsonContentArray['nbCollaborator']);
        $newProjectObject->setFinishedAt($jsonContentArray['finishedAt']);
        $newProjectObject->setUrlFacebook($jsonContentArray['urlFacebook']);
        $newProjectObject->setUrlTwitter($jsonContentArray['urlTwitter']);
        $newProjectObject->setUrlGithub($jsonContentArray['urlGithub']);
        $newProjectObject->setUrlTipeee($jsonContentArray['urlTipeee']);

        // Ajout des tags
        foreach ($jsonContentArray['tags'] as $jsonTag) {
            $dbTag = $tagRepository->findOneBy(['name' => $jsonTag]);
            $newProjectObject->addTag($dbTag);
        }

        // Ajout des technos
        foreach ($jsonContentArray['technos'] as $jsonTechno) {
            $dbTechno = $technoRepository->findOneBy(['name' => $jsonTechno]);
            $newProjectObject->addTechno($dbTechno);
        }

        // Ajout des skills
        foreach ($jsonContentArray['skills'] as $jsonSkill) {
            $dbSkill = $skillRepository->findOneBy(['name' => $jsonSkill]);
            $newProjectObject->addSkill($dbSkill);
        }

        // Ajout de l'utilisateur
        $dbUser = $userRepository->findOneBy(['token' => $jsonContentArray['token']]);
        $newProjectObject->addUser($dbUser);

        // Récupère l'objet Statut "Not Start" et l'attribut par défaut au nouveau projet
        $jsonStatut = $statutRepository->findOneBy(['name' => 'Not Start']);
        $newProjectObject->setStatut($jsonStatut);

        // Enregistre le nouveau projet en bdd
        $entityManager->persist($newProjectObject);
        $entityManager->flush();

        return new JsonResponse(["type" => "success", "message" => "Le projet a bien été ajouté"]);
    }
    /**
     * @Route("/checklikestate", name="_statuslike", methods={"POST"})
     */
    public function checklikestate(Request $request, UserRepository $userRepository, ProjectRepository $projectRepository, FollowRepository $followRepository)
    {

        // Récupére le contenu du json reçu
        $jsonContent = $request->getContent();

        // Transforme le json en tableau
        $jsonContentArray = json_decode($jsonContent, true);

        // Récupère le user qui crée la requête
        $user = $userRepository->findOneBy(['token' => $jsonContentArray['token']]);

        // On renvoie un message d'erreur si l'utilisateur n'existe pas ou que le token n'a pas été trouvé dans la BDD
        if (!$user) {
            return new JsonResponse(["type" => "error", "message" => "L'utilisateur n'existe pas ou le token n'est plus valide"]);
        }

        // Récupère le projet concerné par la requête
        $project = $projectRepository->findOneBy(['id' => $jsonContentArray['project']]);

        // Pour chaques follows de l'utilisateur
        foreach ($user->getFollows() as $follow) {
            // On vérifie si il y en a un qui correspond au projet
            if ($follow->getProject() === $project) {
                if ($follow->getFollow()) {
                    $state = 0;
                } else {
                    $state = 1;
                }
                // Crée une response au format json
                $response = new JsonResponse($state);
                return $response;
            }
        }
        $response = new JsonResponse(0);
        return $response;
    }
}
