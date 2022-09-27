const socket = io.connect();

/* Seleccion de elementos HTML */
const inputEmailMessage = document.querySelector('#emailMessage');
const inputNombreMessage = document.querySelector('#nombreMessage');
const inputApellidoMessage = document.querySelector('#apellidoMessage');
const inputEdadMessage = document.querySelector('#edadMessage');
const inputAliasMessage = document.querySelector('#aliasMessage');
const inputAvatarMessage = document.querySelector('#avatarMessage');
const inputTextMessage = document.querySelector('#textMessage');
const textAlert = document.querySelector('#alert');

const inputNombre = document.querySelector('#nombre');
const inputPrecio = document.querySelector('#precio');
const inputFotoUrl = document.querySelector('#fotoUrl');

const btnSendProduct = document.querySelector('#addProduct');
btnSendProduct.addEventListener('click', sendProduct);

const btnSendMessage = document.querySelector('#sendMessage');

btnSendMessage.addEventListener('click', sendMessage);

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

function sendMessage() {
  const fyh = moment().format('DD/MM/YYYY HH:mm:ss');
  if (validateEmail(inputEmailMessage.value)) {
    const newMensaje = {
      author: {
        email: inputEmailMessage.value,
        nombre: inputNombreMessage.value,
        apellido: inputApellidoMessage.value,
        edad: inputEdadMessage.value,
        alias: inputAliasMessage.value,
        avatar: inputAvatarMessage.value,
      },
      text: inputTextMessage.value,
      fyh: `[${fyh}]`,
    };
    socket.emit('new-message', newMensaje);

    inputTextMessage.value = '';
    textAlert.innerText = '';
  } else {
    textAlert.innerText = 'Por favor, ingresa una dirección de email válida';
  }
}

function sendProduct() {
  const newProduct = {
    nombre: inputNombre.value,
    precio: inputPrecio.value,
    fotoUrl: inputFotoUrl.value,
  };
  socket.emit('new-product', newProduct);

  inputNombre.value = '';
  inputPrecio.value = '';
  inputFotoUrl.value = '';
}

/* Un problema que tengo aca es que no se como hacer para que el partial de los mensajes y de los productos se actualice cuando uno agrega un producto */
socket.on('mensajes', function (data) {
  console.log(data);
});
