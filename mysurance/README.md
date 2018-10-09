# Mysurance

​In​​ this​​ application​​ a​​ user​​ can​​ add her​​ insurances​​ to​​ get​​ a​​ quick​​ overview​​ over​​ all​​ insurances​​ she​​ has​​ and​​ the​​ yearly​​ costs.​​

Made using React with Redux for state management.

## User Journey 1

The​​ user​​ opens​​ the​​ Mysurance​​ app.​​ She​​ lands​​ on​​ a​​ page​​ where​​ all​​ insurances​​ and​​ the​​ sum of ​​their​​ yearly​​ premiums​​ are​​ listed.

## User Journey 2

The​​ user​​ clicks​​ on​​ the​​​ "Add​​ insurance"​​ button. ​​A​​ page​​ opens​​ where​​ the​​ user​​ can​​ enter​​ a title, ​​the​​ yearly​​ premium​​ and​​ an​​ insurance​​ category​​ which​​ he​​ can​​ select​​ from​​ a​​ given [list](https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Types_of_insurance&cmtype=subcat&format=json)​.​​ By clicking​​ the​​ 'Done'​​ button, ​​the​​ input​​ is​​ validated​​ and​​ the​​ user​​ gets​​ back​​ to​​ the​​ overview screen.​​ The​​ just​​ added​​ insurance​​ is​​ now​​ listed​​ and​​ the​​ total​​ yearly​​ premium​​ is​​ updated.

## User Journey 3

The​​ user​​ clicks​​ on​​ a​​ listed​​ insurance​​ and​​ a​​ dialog​​ opens​​ in ​​which​​ the​​ user​​ can​​ remove​​ the insurance​​ from​​ the​​ list.

## Development

The application is hosted on github and can be accessed via [https://wheresvic.github.io/take-home/mysurance/](https://wheresvic.github.io/take-home/mysurance/)

Requirements:

- Node: `>= 8.3.0`

Commands:

- Local (http://localhost:3012): `npm start`
- Testing: `npm test`
- Deployment: `npm run deploy`
- End 2 end testing (assumes application running locally): `npm run e2e` (also note that mocha needs to be locally installed)
- Count lines of js code: `find src/ -name '*.js' | xargs wc -l`

Application structure:

```dir
src/
  index.js      # Application entry point
  App.js        # Application booststrapping and routing
  ...
  components/   # UI components (connected as well as pure)
  core/         # Business logic (redux reducer, action creators)
  redux/        # Redux middleware (localStorage implementation)
  services/     # Common services (stateful as well as stateless) used by both `core` and `components`
  spectre.css/  # CSS framework
```
