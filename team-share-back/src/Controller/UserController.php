<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\RoleRepository;
use App\Repository\UserRepository;
use App\Repository\SkillRepository;
use App\Repository\TechnoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


/**
 * @Route("/user", name="user",)
 */
class UserController extends AbstractController
{
    /**
     * @Route("/register", name="_register", methods={"POST"})
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder, EntityManagerInterface $entityManager, RoleRepository $roleRepository)
    {
        // Récupére le contenu du json reçu
        $jsonContent = $request->getContent();

        // Transforme le json en tableau
        $jsonContentArray = json_decode($jsonContent, true);

        // Crée un nouveau projet vide
        $newUserObject = New User();

        // Hydrate le nouvel utilisateur en fonction du tableau
        $newUserObject->setMail($jsonContentArray['mail']);
        $newUserObject->setPassword($jsonContentArray['password']);
        $newUserObject->setPhone($jsonContentArray['phone']);

        // Encode le password
        $encodedPassword = $encoder->encodePassword($newUserObject, $newUserObject->getPassword());
        $newUserObject->setPassword($encodedPassword);

        // Set username = mail
        $newUserObject->setUsername($newUserObject->getMail());

        // Récupère l'objet Role "USER" et l'attribut par défaut
        $role = $roleRepository->findOneBy(['code' => 'USER']);
        $newUserObject->setRole($role);

        // Enregistre le nouvel utilisateur en bdd
        $entityManager->persist($newUserObject);
        $entityManager->flush();

        return new JsonResponse(["type" => "success", "message" => "L'utilisateur a été ajouté"]);
    }

    /**
     * @Route("/{id}", name="_show", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function show(UserRepository $userRepository, $id)
    {
        // Récupére un Utilisateur en fonction de son id
        $user = $userRepository->findOneUserById($id);

        // Crée une response au format json
        $response = new JsonResponse($user);

        return $response;
    }

    /**
     * @Route("/myprofile", name="_myprofile", methods={"GET", "POST"})
     */
    public function profil(Request $request, UserRepository $userRepository)
    {
        // Récupére le contenu du json reçu
        $jsonContent = $request->getContent();

        // Transforme le json en tableau
        $jsonContentArray = json_decode($jsonContent, true);

        $userToken = $userRepository->findOneBy(['token' => $jsonContentArray['token']]);
        
        $response = new JsonResponse($userRepository->findOneUserById($userToken->getId()));
 
        return $response;

    }

     /**
     * @Route("/update", name="_update", methods={"POST"})
     */
    public function update(Request $request, UserPasswordEncoderInterface $encoder, EntityManagerInterface $entityManager, UserRepository $userRepository, TechnoRepository $technoRepository, SkillRepository $skillRepository)
    {
        // Récupére le contenu du json reçu
        $jsonContent = $request->getContent();

        // Transforme le json en tableau
        $jsonContentArray = json_decode($jsonContent, true);

        $userToken = $userRepository->findOneBy(['token' => $jsonContentArray['token']]);

        $userToken->setFirstname($jsonContentArray['firstname']);
        $userToken->setLastname($jsonContentArray['lastname']);
        $userToken->setJobTitle($jsonContentArray['jobTitle']);
        $userToken->setMail($jsonContentArray['mail']);
        $userToken->setPassword($jsonContentArray['password']);
        $userToken->setCity($jsonContentArray['city']);
        $userToken->setPhone($jsonContentArray['phone']);
        $userToken->setPhoto($jsonContentArray['photo']);
        $userToken->setDescription($jsonContentArray['description']);
        $userToken->setUrlFacebook($jsonContentArray['urlFacebook']);
        $userToken->setUrlTwitter($jsonContentArray['urlTwitter']);
        $userToken->setUrlGithub($jsonContentArray['urlGithub']);
        $userToken->setUrlLinkedin($jsonContentArray['urlLinkedin']);
        $userToken->setToken($userToken->getToken());

        $encodedPassword = $encoder->encodePassword($userToken, $jsonContentArray['password']);
        $userToken->setPassword($encodedPassword);

        $userToken->setUsername($userToken->getMail());

        // Ajout des technos
        foreach ($jsonContentArray['technos'] as $jsonTechno) {
          $dbTechno = $technoRepository->findOneBy(['name' => $jsonTechno]);
          $userToken->addTechno($dbTechno);
        }

        // Ajout des skills
        foreach ($jsonContentArray['skills'] as $jsonSkill) {
          $dbSkill = $skillRepository->findOneBy(['name' => $jsonSkill]);
          $userToken->addSkill($dbSkill);
        }

        // $entityManager->persist($userToken);
        $entityManager->flush();

        return new JsonResponse(["type" => "success", "message" => "L'utilisateur a été modifié"]);
    }

     /**
     * @Route("/projectuser", name="_projectuser", methods={"GET", "POST"})
     */
    public function projectuser(Request $request, UserRepository $userRepository)
    {
        // Récupére le contenu du json reçu
        $jsonContent = $request->getContent();

        // Transforme le json en tableau
        $jsonContentArray = json_decode($jsonContent, true);
        // récupération de l'utilisateur à partir du token envoyé par le front 
        $currentUser = $userRepository->findOneBy(['token' => $jsonContentArray['token']]);
        //dans le cas ou on ne trouve pas d'utilisateur on renvoi un message d'erreur 
        if (!$currentUser) {
            return new JsonResponse(["type" => "error", "message" => "L'utilisateur n'existe pas ou le token n'est plus valide"]);
        }
        $response = new JsonResponse($currentUser->getProjects());
 
        return $response;

    }
}
