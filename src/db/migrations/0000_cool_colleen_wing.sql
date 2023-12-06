CREATE TABLE `event` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`slug` text NOT NULL,
	`referrer` text NOT NULL,
	`country` text NOT NULL,
	`ip` text NOT NULL,
	`os` text,
	`browser` text,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`rating` integer NOT NULL,
	`message` text,
	`is_resolved` integer DEFAULT false NOT NULL,
	`ip` text NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `query` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`type` text NOT NULL,
	`message` text NOT NULL,
	`blog_post_link` text,
	`is_resolved` integer DEFAULT false NOT NULL,
	`has_replied` integer DEFAULT false NOT NULL,
	`ip` text NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `token` (
	`id` text PRIMARY KEY NOT NULL,
	`timestamp` integer NOT NULL
);
