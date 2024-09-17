CREATE TABLE IF NOT EXISTS "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_id" uuid,
	"display_name" text,
	"phone_number" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_auth_id_unique" UNIQUE("auth_id"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "searches" (
	"search_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
