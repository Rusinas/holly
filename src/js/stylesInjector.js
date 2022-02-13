(function() {
    const bodyNode = document.querySelector('body')
    
    const style = document.createElement('style')
    const styles = `
        [STYLES]
    `

    style.innerText = styles.replace(/(\r\n|\n|\r)/gm, '')
    
    bodyNode.appendChild(style)
})()