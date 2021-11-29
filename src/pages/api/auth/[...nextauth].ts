import NextAuth, { Session } from "next-auth";
import Providers from "next-auth/providers";
import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";

//Formatos de autenticação
//JWT (Storage)
//Next Auth (social)
//Cognito, Auth0

//https://nextjs.org/docs/authentication
//https://next-auth.js.org/

//https://next-auth.js.org/configuration/callbacks

export default NextAuth({
  providers: [
    Providers.GitHub({
      //Preciso criar uma aplicação dentro do github para a parte autenticação
      clientId: process.env.GITTHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
  ],
  callbacks: {
    async session(session: Session) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection(
              q.Match(
                q.Index("subscription_by_user_ref"),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(q.Index("subscription_by_status"), "active")
            )
          )
        );

        return {
          ...session,
          activeSubscription: userActiveSubscription,
        };
      } catch {
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },

    async signIn(user) {
      const { email } = user;

      try {
        // await fauna.query(
        //   q.If(
        // q.Not(q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))),
        // q.Create(q.Collection("users"), { data: { email } });
        // q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
        //   )
        // );

        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.email))
              )
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
          )
        );

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

// export default NextAuth({
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// });
