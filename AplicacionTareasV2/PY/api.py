
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Para permitir peticiones desde frontend JS

# Datos de entrenamiento simples
textos = [
    "enviar informe urgente",
    "reunión con cliente importante",
    "comprar café",
    "leer artículos de productividad",
    "terminar reporte hoy",
    "lavar ropa",
    "preparar presentación para mañana",
    "responder correos",
    "estudiar para la prueba",
    "ver tutoriales de JavaScript"
]
prioridades = [
    "Alta", "Alta", "Baja", "Media", "Alta",
    "Baja", "Alta", "Media", "Alta", "Media"
]

# Entrenar modelo
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(textos)
model = MultinomialNB()
model.fit(X, prioridades)

@app.route("/clasificar", methods=["POST"])
def clasificar():
    data = request.get_json()
    descripcion = data.get("descripcion", "")
    if not descripcion:
        return jsonify({"error": "Descripción vacía"}), 400

    X_nuevo = vectorizer.transform([descripcion])
    prediccion = model.predict(X_nuevo)[0]
    return jsonify({"prioridad": prediccion})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
