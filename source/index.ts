// import $ from 'fire-keeper'
import electron from 'electron'

// variable

const { app, BrowserWindow, session } = electron

// function

function registerRedirection(): void {

  const { webRequest } = session.defaultSession

  webRequest.onBeforeRequest({
    urls: ['file://*']
  }, (details, callback) => {
    const path = details.url.substr(7)

    if (path.startsWith('/static')) {
      callback({
        redirectURL: `file://${__dirname}/app${path}`
      })
      return
    }

    if (~path.search(/\.com\//)) {
      callback({
        redirectURL: `https://${path}`
      })
      return
    }

    callback({})
  })
}

// execute

app.on('ready', () => {

  const win = new BrowserWindow({
    width: 375,
    height: 812,
    frame: false,
    webPreferences: {
      webSecurity: false
    }
  })

  registerRedirection()

  win.webContents.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1')
  win.webContents.openDevTools()
  win.loadFile(`./dist/app/index.html`)
})