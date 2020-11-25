# Dad's Notes App

Express.js based notes app

---

## How to use

To start the app.

- Open the project in the terminal and run the command `npm start`

To get most recent version of notes and links.

- In the terminal run `git pull origin master`

To post changes of links and/or update notes.

- In the terminal run `git add .`, then `git commit -m "{Commit name}"`, and finally `git push origin master`

---

## API Docs

All backend routes start with `/api/` followed by the category name in camel case.

Web routes:

- GET - `/api/web`

- POST - `/api/web` body: { title : `string`, content: `string`, tags: [`string`]}

- PUT - `/api/web/:id` body: body: { title : `string`, content: `string`, tags: [`string`]}

- DELETE - `/api/web/:id`

Linux routes:

- GET - `/api/linux`

- POST - `/api/linux` body: { title : `string`, content: `string`, tags: [`string`]}

- PUT - `/api/linux/:id` body: body: { title : `string`, content: `string`, tags: [`string`]}

- DELETE - `/api/linux/:id`

Pyhton routes:

- GET - `/api/pyhton`

- POST - `/api/pyhton` body: { title : `string`, content: `string`, tags: [`string`]}

- PUT - `/api/pyhton/:id` body: body: { title : `string`, content: `string`, tags: [`string`]}

- DELETE - `/api/pyhton/:id`

Computers routes:

- GET - `/api/computers`

- POST - `/api/computers` body: { title : `string`, content: `string`, tags: [`string`]}

- PUT - `/api/computers/:id` body: body: { title : `string`, content: `string`, tags: [`string`]}

- DELETE - `/api/computers/:id`

Raspberry Pi routes:

- GET - `/api/raspberryPi`

- POST - `/api/raspberryPi` body: { title : `string`, content: `string`, tags: [`string`]}

- PUT - `/api/raspberryPi/:id` body: body: { title : `string`, content: `string`, tags: [`string`]}

- DELETE - `/api/raspberryPi/:id`
