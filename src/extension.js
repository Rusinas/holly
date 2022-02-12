const path = require('path')
const fs = require('fs')
const vscode = require('vscode')

function activate(context) {

    try {
        const isWin = /^win/.test(process.platform)
        const appDir = path.dirname(require.main.filename)
        const base = appDir + (isWin ? "\\vs\\code" : "/vs/code")

        const htmlFile =
            base +
            (isWin
                ? "\\electron-browser\\workbench\\workbench.html"
                : "/electron-browser/workbench/workbench.html")

        const templateFile =
            base +
            (isWin
                ? "\\electron-browser\\workbench\\holly.js"
                : "/electron-browser/workbench/holly.js")


        // console.log('Ало ебать html файл нахуй', htmlFile)


        let inject_styles = fs.readFileSync(__dirname + '/js/injectStyles.js', 'utf-8')
        const styles = fs.readFileSync(__dirname + '/css/beauty.css', 'utf-8')

        // console.log('INJECT STYLES BEFORE', inject_styles)
        
        inject_styles.replace('function', 'хуянкшион')

        console.log('inject_styles', inject_styles)

        inject_styles = inject_styles.replace(/\[STYLES\]/g, styles)
        
        // console.log('INJECT STYLES AFTER', inject_styles)
        // const chromeStyles = fs.readFileSync(__dirname +'/css/beauty.css', 'utf-8')
        // const jsTemplate = fs.readFileSync(__dirname +'/js/theme_template.js', 'utf-8')
        // const themeWithGlow = jsTemplate.replace(/\[DISABLE_GLOW\]/g, disableGlow)
        // const themeWithChrome = themeWithGlow.replace(/\[CHROME_STYLES\]/g, chromeStyles)
        // const finalTheme = themeWithChrome.replace(/\[NEON_BRIGHTNESS\]/g, neonBrightness)
        fs.writeFileSync(templateFile, inject_styles, "utf-8")

        // modify workbench html
        const html = fs.readFileSync(htmlFile, "utf-8")

        // const isEnabled = html.includes("neondreams.js")
        let output = html.replaceAll(/^.*<!-- HOLLY THEME --><script src="holly.js"><\/script><!-- BEAUTIFICATION -->.*\n?/mg, '')
        console.info('This shit contains comment before', output.includes('<!-- HOLLY THEME --><script src="holly.js"></script><!-- BEAUTIFICATION -->'))
        output = html.replace('</html>', `<!-- HOLLY THEME --><script src="holly.js"></script><!-- BEAUTIFICATION -->\n`)
        // output = html.replace('</html>', `</HTMLLLL>`)
        console.info('This shit contains comment after', output.includes('<!-- HOLLY THEME --><script src="holly.js"></script><!-- BEAUTIFICATION -->'))
        output += '</html>'

        // console.log('html', html.replaceAll('<!-- HOLLY THEME --><script src="holly.js"></script><!-- BEAUTIFICATION -->', ''))

        console.log('Output', output)



        console.error('WHERE ARE YOU', htmlFile)


        fs.writeFileSync(htmlFile, output, "utf-8")

        // if (!isEnabled) {
        //     // delete synthwave script tag if there
        //     let output = html.replace(/^.*(<!-- SYNTHWAVE 84 --><script src="neondreams.js"><\/script><!-- NEON DREAMS -->).*\n?/mg, '')
        //     // add script tag
        //     output = html.replace(/\<\/html\>/g, `	<!-- SYNTHWAVE 84 --><script src="neondreams.js"></script><!-- NEON DREAMS -->\n`)
        //     output += '</html>'

        //     fs.writeFileSync(htmlFile, output, "utf-8")

        //     vscode.window
        //         .showInformationMessage("Neon Dreams enabled. VS code must reload for this change to take effect. Code may display a warning that it is corrupted, this is normal. You can dismiss this message by choosing 'Don't show this again' on the notification.", { title: "Restart editor to complete" })
        //         .then(function(msg) {
        //             vscode.commands.executeCommand("workbench.action.reloadWindow")
        //         })

        // } else {
        //     vscode.window
        //         .showInformationMessage('Neon dreams is already enabled. Reload to refresh JS settings.', { title: "Restart editor to refresh settings" })
        //         .then(function(msg) {
        //             vscode.commands.executeCommand("workbench.action.reloadWindow")
        //         })
        // }

    } catch (error) {
        console.error('Чета ошибка какая-то', error)
    }
    // const disposable = vscode.commands.registerCommand('holly.beautify', function () {


    // 	try {

    // 		// const version = context.globalState.get(`${context.extensionName}.version`)

    // 		// generate production theme JS
    // 		const chromeStyles = fs.readFileSync(__dirname +'/css/editor_chrome.css', 'utf-8')
    // 		const jsTemplate = fs.readFileSync(__dirname +'/js/theme_template.js', 'utf-8')
    // 		const themeWithGlow = jsTemplate.replace(/\[DISABLE_GLOW\]/g, disableGlow)
    // 		const themeWithChrome = themeWithGlow.replace(/\[CHROME_STYLES\]/g, chromeStyles)
    // 		const finalTheme = themeWithChrome.replace(/\[NEON_BRIGHTNESS\]/g, neonBrightness)
    // 		fs.writeFileSync(templateFile, finalTheme, "utf-8")

    // 		// modify workbench html
    // 		const html = fs.readFileSync(htmlFile, "utf-8")

    // 		// check if the tag is already there
    // 		const isEnabled = html.includes("neondreams.js")

    // 		if (!isEnabled) {
    // 			// delete synthwave script tag if there
    // 			let output = html.replace(/^.*(<!-- SYNTHWAVE 84 --><script src="neondreams.js"><\/script><!-- NEON DREAMS -->).*\n?/mg, '')
    // 			// add script tag
    // 			output = html.replace(/\<\/html\>/g, `	<!-- SYNTHWAVE 84 --><script src="neondreams.js"></script><!-- NEON DREAMS -->\n`)
    // 			output += '</html>'

    // 			fs.writeFileSync(htmlFile, output, "utf-8")

    // 			vscode.window
    // 				.showInformationMessage("Neon Dreams enabled. VS code must reload for this change to take effect. Code may display a warning that it is corrupted, this is normal. You can dismiss this message by choosing 'Don't show this again' on the notification.", { title: "Restart editor to complete" })
    // 				.then(function(msg) {
    // 					vscode.commands.executeCommand("workbench.action.reloadWindow")
    // 				})

    // 		} else {
    // 			vscode.window
    // 				.showInformationMessage('Neon dreams is already enabled. Reload to refresh JS settings.', { title: "Restart editor to refresh settings" })
    // 				.then(function(msg) {
    // 					vscode.commands.executeCommand("workbench.action.reloadWindow")
    // 				})
    // 		}
    // 	} catch (e) {
    // 		if (/ENOENT|EACCES|EPERM/.test(e.code)) {
    // 			vscode.window.showInformationMessage("You must run VS code with admin privileges in order to enable Neon Dreams.")
    // 			return
    // 		} else {
    // 			vscode.window.showErrorMessage('Something went wrong when starting neon dreams')
    // 			return
    // 		}
    // 	}
    // })

    // let disable = vscode.commands.registerCommand('synthwave84.disableNeon', uninstall)

    // context.subscriptions.push(disposable)
    // context.subscriptions.push(disable)
}

function deactivate() { }

function uninstall() {

}

exports.activate = activate
exports.deativate = deactivate

module.exports = {
    activate,
    deactivate
}