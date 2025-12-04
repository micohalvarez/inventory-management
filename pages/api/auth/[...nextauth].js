import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import authInstance from '../../../utils/auth-instance'

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize (credentials) {

		console.log("--- AUTHORIZE FUNCTION STARTING ---");
                const data = {
                    username: credentials.emailAddress,
                    password: credentials.password
                }

                const res = await authInstance
                    .post('api/v1/account/login/', data)

		console.log(res)	
                if (res.status === 200) {
                    return res.data
                } else {
                    throw new Error('Invalid credentials')
                }
            }
        })
    ],
    callbacks: {
        jwt: async (token, user, account, profile, isNewUser) => {
            //  "user" parameter is the object received from "authorize"
            //  "token" is being send below to "session" callback...
            //  ...so we set "user" param of "token" to object from "authorize"...
            //  ...and return it...
            user && (token.user = user)
            return Promise.resolve(token) // ...here
        },
        session: async (session, user, sessionToken) => {
            //  "session" is current session object
            //  below we set "user" param of "session" to value received from "jwt" callback
            session.user = user.user
            return Promise.resolve(session)
        }
    }
})
