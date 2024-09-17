import { redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { db, Schema } from '$lib/db';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const inviteSchema = z.object({
    placeId: z.string(),
    displayName: z.string(),
    lat: z.number(),
    lng: z.number(),
});

export async function load() {
    return {
        form: await superValidate(zod(inviteSchema))
    }
}

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(inviteSchema));

        if (!form.valid)
            return fail(500, form)

        const [group] = await db
            .insert(Schema.Searches)
            .values({
                location: {
                    googlePlaceId: form.data.placeId,
                    displayName: form.data.displayName,
                    latitude: form.data.lat,
                    longitude: form.data.lng,
                }
            })
            .returning()

        return redirect(308, '/search/' + group.id)
    }
}