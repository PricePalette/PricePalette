CREATE TABLE `Templates` (
  `template_id` varchar(255) PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `description` text,
  `usages` bigint NOT NULL,
  `active` bit NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime
);

CREATE TABLE `Users` (
  `user_id` varchar(255) PRIMARY KEY,
  `email` varchar(255) UNIQUE NOT NULL,
  `user_name` varchar(255) UNIQUE NOT NULL,
  `organization_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `plan_id` varchar(255) NOT NULL,
  `active` bit NOT NULL,
  `joined_date` datetime NOT NULL
);

CREATE TABLE `Widgets` (
  `widget_id` varchar(255) PRIMARY KEY,
  `user_id` varchar(255) NOT NULL,
  `from_template` bit NOT NULL,
  `template_id_used` varchar(255),
  `title` varchar(255) NOT NULL,
  `description` text,
  `active` bit NOT NULL,
  `created_date` datetime NOT NULL
);

CREATE TABLE `WidgetEmbed` (
  `embed_id` varchar(255) PRIMARY KEY,
  `widget_id` varchar(255) NOT NULL,
  `created_date` datetime,
  `views` bigint,
  `active` bit
);

ALTER TABLE `Widgets` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);

ALTER TABLE `WidgetEmbed` ADD FOREIGN KEY (`widget_id`) REFERENCES `Widgets` (`widget_id`);

ALTER TABLE `Widgets` ADD FOREIGN KEY (`template_id_used`) REFERENCES `Templates` (`template_id`);
