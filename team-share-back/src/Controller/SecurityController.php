<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(Request $request, UserPasswordEncoderInterface $encoder, SerializerInterface $serializer, UserRepository $userRepository, EntityManagerInterface $entityManager): Response
    {
        $jsonContent = $request->getContent();
        
        $checkUser = $serializer->deserialize($jsonContent, User::class, 'json');

        $user = $userRepository->findOneBy(['username' => $checkUser->getUsername()]);

        if(!$user) {
            return new JsonResponse(["type" => "error", "message" => "L'utilisateur n'existe pas"]);
        }
        if ($encoder->isPasswordValid($user, $checkUser->getPassword())){
            $tokenBrut = rtrim(strtr(base64_encode(random_bytes(50)), '+/', '-_'), '=');
            $user->setToken($tokenBrut);
            $token = ["token" => $tokenBrut];
            $entityManager->flush();
            return new JsonResponse($token);
        }

        return new JsonResponse(["type" => "error", "message" => "Mot de passe invalide"]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(Request $request, UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        // Récupére le contenu du json reçu
        $jsonContent = $request->getContent();

        // Transforme le json en tableau
        $jsonContentArray = json_decode($jsonContent, true);
        

        $user = $userRepository->findOneBy(['token' => $jsonContentArray['token']]);

        // Si le token n'existe pas on envoie un message d'erreur
        if(!$user) {
            return new JsonResponse(["type" => "success", "message" => "L'utilisateur n'existe pas"]);
        }

        // Sinon on set le token à null
        $user->setToken(null);
        $entityManager->flush();

        return new JsonResponse(["type" => "success", "message" => "Le token a été setté à null"]);
    }
}
