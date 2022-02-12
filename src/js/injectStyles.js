(function() {
    console.log(`Темплейт ма'фака`)
    const bodyNode = document.querySelector('body')
    
    const style = document.createElement('style')
    const styles = `[STYLES]`

    console.log('Вставляем стили', styles)

    style.innerText = styles.replace(/(\r\n|\n|\r)/gm, '')

    bodyNode.appendChild(style)
})()