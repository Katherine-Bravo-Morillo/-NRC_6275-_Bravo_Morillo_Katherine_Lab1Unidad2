#importamos la libreria Flask
from flask import Flask, render_template
import os
#---------------------------------------
# Permitirá posteriormente desplegar la aplicación en un servidor Web
#---------------------------------------
app = Flask(__name__)
app.secret_key = "s3cr3t"
app.debug = False
app._static_folder = os.path.abspath("templates/static/")

#---------------------------------------
#Ruta de pagina index
#---------------------------------------


@app.route('/', methods=["GET"])
#funcion que hace el llamado al archivo index
def index():
    return render_template("/layouts/index.html")


#---------------------------------------
#iniciamos la aplicacion

' '' Main para iniciar la aplicacion ' '' 
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
