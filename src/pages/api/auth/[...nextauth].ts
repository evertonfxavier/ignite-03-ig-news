import NextAuth from "next-auth";
import Providers from "next-auth/providers";

//Formatos de autenticação
//JWT (Storage)
//Next Auth (social)
//Cognito, Auth0

//https://nextjs.org/docs/authentication
//https://next-auth.js.org/

// export default NextAuth({
//   providers: [
//     Providers.GitHub({
//       //Preciso criar uma aplicação dentro do github para a parte autenticação
//       clientId: process.env.GITTHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       scope: "read:user",
//     }),
//   ],
// });

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
