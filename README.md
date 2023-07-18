
# Alala's Keening OBS and TTRPG Tool

This allows the creation of OBS screen in React/Next, and the management of information, leads, images, etc between the GM and the players.


## Roadmap

- [ ]  allows players to respond to messages
- [ ]  pagination for inbox
- [ ]  paginzation for contacts
- [ ]  pagnization for new stories
- [ ]  search for news stories
- [ ]  search for inbox
- [ ]  use the Clerk user.created Webhook and a 'guest' role to allow guests
- [ ]  switch off Ably? 


## Required

* You will need an account at [Clerk](https://clerk.com), [Ably](https://ably.com) and [Cloudinary](https://cloudinary.com/)
* You will need to decide on your database. Postgres on Railway or Vercel work nicely. You can probably use SQLite and the original ENV VARs are in the .env.example for that. See [Strapi Database Docs](https://docs.strapi.io/dev-docs/configurations/database) for more info. 


## Installation

Clone the project. Inside will be a directory for Strapi and a directory for Next. In each, edit the `.env.example` file, update the vars listed and save as `.env`

Run `npm i` or `pnpm i` in the root, /next and /strapi directories

Connect to your Strapi admin panel and create sample content for the various content models. Once a user logs in, you will need to manually paste their Clerk userId into Strapi.

j
## Run Locally

You can runn the application with the following from /

```bash
npm run dev
```
    

## Deployment

Deploying this project will require 3 steps:


### Production Database


If you opted for Railway, Vercel or some other hosted database you may be able to use the same database. You can also create a second one. 


### Strapi

Strapi can be deployed easily to a service like Railway. You can assign your own domain or use Railway's generic one generated for the app.


### NextJs

The easiest place to deploy, particularly given this is a small, low traffic application, is Vercel. Anywhere that properly supports NextJs can work.


## Tech Stack

**Client:** React, NextJs, TailwindCSS, Shadcn/ui

**Server:** Strapi, NextJs

**Services:** Clerk, Ably


## Acknowledgements

 - [The Expanse: Alala's Keening](https://www.twitch.tv/jacobmgevans)
 - [Jacon MG Evans](https://twitter.com/JacobMGEvans/)
 - [Mark Lynch](https://twitter.com/marklynchdev)
 - [Jenn Junod](https://twitter.com/JennJunod)
 - [Alex Falupe](https://twitter.com/alayfalupe)


## License

[MIT](https://choosealicense.com/licenses/mit/)

