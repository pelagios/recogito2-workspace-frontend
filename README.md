# Recogito workspace and public profile UI

The client-side user interfaces for the Recogito __personal workspace__ and
__public profile__ pages.

## Dependencies

- node.js (v4.2.6)
- npm (v6.1.0)

## Development

- Run `npm install` to install project dependencies
- Make sure that 
  - Recogito is running on [http://localhost:9000](http://localhost:9000)
  - you are logged in to Recogito
- Run `npm start` to launch the development server
- If your browser doesn't launch automatically, go to [http://localhost:3000](http://localhost:3000)

## Building & deployment for production

Run `npm run build` to build the compiled distribution. This will generate a `/build` folder with 
the following structure:

```
/static
/style
asset-manifest.json
profile.scala.html
workspace.scala.html
```

- copy the `/static` folder into the `/public/javascripts` folder of Recogito, replacing existing
  contents
- in Recogito's `/app/views/my` directory, replace the `profile.scala.html` and `workspace.scala.html`
  template files
- restart Recogito
