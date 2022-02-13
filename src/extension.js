const path = require('path')
const fs = require('fs')
const vscode = require('vscode')

function activate(context) {
    const enable = vscode.commands.registerCommand('holly.beautify', () => holly(true))
    const disable = vscode.commands.registerCommand('holly.uglify', () => holly(false))

    context.subscriptions.push(enable)
	context.subscriptions.push(disable)
}

function holly(apply) {
    try {
        const app_dir = path.dirname(require.main.filename)
        const base = app_dir + '/vs/code'
        const html_file = base + '/electron-browser/workbench/workbench.html'
        const template_file = base + '/electron-browser/workbench/holly.js'

        let styles_injector = fs.readFileSync(__dirname + '/js/stylesInjector.js', 'utf-8')
        const styles = fs.readFileSync(__dirname + '/css/beauty.css', 'utf-8')

        styles_injector = styles_injector.replace(/\[STYLES\]/g, styles)
        
        fs.writeFileSync(template_file, styles_injector, "utf-8")

        const html = fs.readFileSync(html_file, "utf-8")
        const is_applied = html.includes('holly.js')
        let output = html.replace(`	<!-- HOLLY THEME --><script src="holly.js"></script><!-- BEAUTIFICATION -->\n`, '')
        
        if (apply) {
            output = output.replace('</html>', `	<!-- HOLLY THEME --><script src="holly.js"></script><!-- BEAUTIFICATION -->\n`)
            output += '</html>'

            // If wasn't applied before
            if (!is_applied) {
                vscode.window
                    .showInformationMessage('Holly has been successfully applied. Please, restart the editor to see the whole beauty of the theme. Have a productive coding time! :3', { title: 'Restart editor' })
                    .then(function() {
                        vscode.commands.executeCommand('workbench.action.reloadWindow')
                    })
            } else {
                vscode.window.showInformationMessage('Holly has already been applied')
            }
        } else {
            if (is_applied) {
                vscode.window.showInformationMessage(`Holly hasn't been applied yet`)
            } else {
                vscode.window
                    .showInformationMessage(`Holly theme disabled :( Please, restart the editor to apply changes`, { title: 'Restart editor' })
                    .then(function() {
                        vscode.commands.executeCommand('workbench.action.reloadWindow')
                    })
            }
        }

        fs.writeFileSync(html_file, output, 'utf-8')
    } catch (error) {
        console.error('Error applying Holly theme:', error)
    }
}

function deactivate() { }

exports.activate = activate
exports.deativate = deactivate

module.exports = {
    activate,
    deactivate
}