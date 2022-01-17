
const statusXX = (res: any, eles: any) => {
    let xxStatus = res[9]
    switch (xxStatus) {
        case 0:
            eles[0].style.background = '#0A1843'
            eles[1].style.background = '#0A1843'
            eles[2].style.background = '#0C2860'
            eles[3].style.background = '#0C2860'
            break;
        case 1:
            eles[0].style.background = ''
            eles[1].style.background = '#0A1843'
            eles[2].style.background = '#0C2860'
            eles[3].style.background = '#0C2860'
            break;
        case 2:
            eles[0].style.background = '#0A1843'
            eles[1].style.background = ''
            eles[2].style.background = '#0C2860'
            eles[3].style.background = '#0C2860'
            break;
        case 3:
            eles[2].style.background = ''
            eles[1].style.background = '#0A1843'
            eles[0].style.background = '#0A1843'
            eles[3].style.background = '#0C2860'
            break;
        case 4:
            eles[3].style.background = ''
            eles[1].style.background = '#0A1843'
            eles[2].style.background = '#0C2860'
            eles[0].style.background = '#0A1843'
            break;
    }
}
export default statusXX