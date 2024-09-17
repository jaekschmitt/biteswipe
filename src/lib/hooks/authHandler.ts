import { redirect, type Handle } from "@sveltejs/kit"

export const authGuard: Handle = async ({ event, resolve }) => {
    const { session, user } = await event.locals.safeGetSession()

    event.locals.session = session
    event.locals.user = user

    if (event.url.pathname === '/login' || event.url.pathname === '/verify')
        return resolve(event)

    if (!event.locals.session) {        
        console.log('No session found, redirecting to /login')
        redirect(303, '/login')
    }

    return resolve(event)
}