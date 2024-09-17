import { db } from '$lib/db';

export async function load({ params }) {
    const group = await db.query.Searches.findFirst({
        where: (Searches, { eq }) => eq(Searches.id, params.groupId)
    })

    return {
        group
    }
}