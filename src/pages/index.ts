
import Typography from "@elements/Typography";

const typography = new Typography({
  text: 'pidor'
})

const $app =  document.getElementById("app")

if ($app && typography.textElement) {
  $app.appendChild(typography.textElement)
}


