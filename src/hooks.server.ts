import { type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

import { supabase } from '$lib/hooks/supabaseHandler'

const HOOK_HANDLERS = [
    supabase,

]

export const handle: Handle = sequence(...HOOK_HANDLERS)