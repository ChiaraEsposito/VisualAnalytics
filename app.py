import flask

from flask import request, jsonify, render_template, redirect
import os, sys, pca


IMAGES_FOLDER = os.path.join('static', 'images')

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = IMAGES_FOLDER

import requests

  
@app.route('/', methods=['GET'])
def home():
    #run code here
    pca.pca()
        
    return render_template("index.html")
      
@app.route('/applyfilters', methods = ['GET', 'POST'] )
def filter_csv():
    '''
    # Start with the full dataset (to remove previous filters)
    create_shared_dataset.create_csv()
    # Read inserted parameters (callig them by their 'name' value)
    sex = request.args.get('sex')
    city = request.args.get('city')
    shop = request.args.get('shop') 
    # Call the function to create the filtered dataset
    create_shared_dataset.filter_csv(sex,city,shop)
    # Run K-Means Clustering on the new data (with default params)
    run_pca_kmeans.clustering(2,4) 
    # Run again rfm segmentation on the new data
    run_rfm.rfm()
    # Recreate customer summary for the segment table
    create_customer_summary.customer_summary()
    '''
    # Return again the same html template
    return render_template('index.html')

# Service to reset the original visualization, removing all selections
@app.route('/reset', methods = ['GET', 'POST'] )
def reset():
    return home()
      
app.run(host='127.0.0.1', port=8888)