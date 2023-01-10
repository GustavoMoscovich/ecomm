// activación del módulo js para DarkMode


const options = {
    bottom: '83%', // default: '32px'
    //right: 'unset', // default: '32px'
    right: '5px', // default: '32px'
    //left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.75)), url("../multimedia/pokemon-fondo.jpg")',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }

const darkmode = new Darkmode(options);
darkmode.showWidget();
