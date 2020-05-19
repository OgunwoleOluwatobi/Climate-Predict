from flask import Flask, render_template, request
import numpy as np
import pandas as pd
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn import preprocessing
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import r2_score
import joblib
from sklearn.preprocessing import RobustScaler
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
import csv
from math import sqrt
from sklearn.svm import SVR
import sklearn.svm as svm
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import PolynomialFeatures
from datetime import timedelta

app = Flask(__name__)

months = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
column_names_temp = [
    'Year', 'Month', 'Day', 'Hour', 'Minutes', 'TempMean', 'TempMax', 'TempMin'
]
column_names_humi = [
    'Year', 'Month', 'Day', 'Hour', 'Minutes', 'HumiMean', 'HumiMax', 'HumiMin'
]
column_names_prec = [
    'Year', 'Month', 'Day', 'Hour', 'Minutes', 'PrecMean', 'PrecMax', 'PrecMin'
]
column_names_used = [
    'MD'
]

def make_numeric_values(arr, title):
    new_arr = []
    for date in arr[title]:
        new_arr.append(date)
    arr[title] = new_arr

def fix_array(arr):
    for name in column_names_used:
        make_numeric_values(arr, name)

def train():
    dataset_url1 = 'dailytemphistory_export_2020-03-18T17_20_46.csv'
    dataset_url2 = 'dailyhumihistory_export_2020-03-18T17_21_13.csv'
    dataset_url3 = 'dailyrainhistory_export_2020-03-18T17_21_25.csv'
    tree_model = DecisionTreeRegressor()

    data1 = pd.read_csv(dataset_url1, sep=';', skiprows=12, names=column_names_temp)
    data1['MD'] = data1['Month'].astype(str)+""+data1['Day'].astype(str)
    data1 = data1.drop('TempMin', axis=1)
    X = data1.drop(["TempMax"], axis=1)
    X = X.drop(['Hour'], axis = 1)
    X = X.drop(['Minutes'], axis = 1)
    X = X.drop(['Year'], axis = 1)
    X = X.drop(['Month'], axis = 1)
    X = X.drop(['Day'], axis = 1)
    X = X.drop(['TempMean'], axis = 1)
    fix_array(X)
    y = data1['TempMean']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=123)    
    tree_model.fit(X_train, y_train)
    print('Accuracy: ', tree_model.score(X_test, y_test))
    joblib.dump(tree_model, 'temprature.pkl')

    data1 = pd.read_csv(dataset_url2, sep=';', skiprows=12, names=column_names_humi)
    data1['MD'] = data1['Month'].astype(str)+""+data1['Day'].astype(str)
    data1 = data1.drop('HumiMin', axis=1)
    X = data1.drop(["HumiMax"], axis=1)
    X = X.drop(['Hour'], axis = 1)
    X = X.drop(['Minutes'], axis = 1)
    X = X.drop(['Year'], axis = 1)
    X = X.drop(['Month'], axis = 1)
    X = X.drop(['Day'], axis = 1)
    X = X.drop(['HumiMean'], axis = 1)
    fix_array(X)
    y = data1['HumiMean']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=123)
    tree_model.fit(X_train, y_train)
    print('Accuracy: ', tree_model.score(X_test, y_test))
    joblib.dump(tree_model, 'humidity.pkl')

    data1 = pd.read_csv(dataset_url3, sep=';', skiprows=12, names=column_names_prec)
    data1['MD'] = data1['Month'].astype(str)+""+data1['Day'].astype(str)
    data1 = data1.drop('PrecMin', axis=1)
    X = data1.drop(["PrecMax"], axis=1)
    X = X.drop(['Hour'], axis = 1)
    X = X.drop(['Minutes'], axis = 1)
    X = X.drop(['Year'], axis = 1)
    X = X.drop(['Month'], axis = 1)
    X = X.drop(['Day'], axis = 1)
    X = X.drop(['PrecMean'], axis = 1)
    fix_array(X)
    y = data1['PrecMean']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=123)
    tmodel = DecisionTreeRegressor()
    tmodel.fit(X_train, y_train)
    print('Accuracy: ', tmodel.score(X_test, y_test))
    joblib.dump(tmodel, 'rainfall.pkl')

@app.route('/')
def index():
    return render_template('climate-predict/build/index.html')

@app.route('/current', methods=['GET'])
def current():
    if request.method == 'GET':
        print("Hello")
        train()
        tree_model_temprature = joblib.load('temprature.pkl')
        tree_model_humidity = joblib.load('humidity.pkl')
        tree_model_rainfall = joblib.load('rainfall.pkl')

        datetime_object = datetime.now()
        datetime_object = datetime_object.strftime("%Y-%m-%d %H:%M:%S")
        first = datetime_object.split(' ')
        sec = first[0].split('-')
        today = sec[1]+""+sec[2]
        date = [[today]]

        temp = tree_model_temprature.predict(date)[0]
        humi = tree_model_humidity.predict(date)[0]
        rain = tree_model_rainfall.predict(date)[0]
        
        return{
            'temp': round(temp, 1),
            'humi': round(humi, 2),
            'prec': round(rain, 2)
        }

@app.route('/res', methods=['POST'])
def res():
    train()
    tree_model_temprature = joblib.load('temprature.pkl')
    tree_model_humidity = joblib.load('humidity.pkl')
    tree_model_rainfall = joblib.load('rainfall.pkl')
    if request.method == 'POST':
        req = request.json;
        print(req["body"]["start"]);
        #return {'req': req}
        monthstart = req["body"]["start"]
        yearstart = req["body"]["starty"]
        monthend = req["body"]["end"]
        yearend = req["body"]["endy"]
        print(monthstart, yearstart, monthend, yearend)
        start=0
        stop=0
        years = int(yearstart)
        for item in range(0,len(months)):
            if monthstart == months[item]:
                start = item
            if monthend == months[item]:
                stop = item + 1
        year = int(yearend) - int(yearstart)
        #print (year)
        arr = []
        arryears = []
        arrtemp = []
        arrhumi = []
        arrrain = []
        totmonth = []
        totdays = []
        for i in range(0, year+1):
            arryears.append(int(yearstart)+i)
            if years%4 == 0:
                feb = 29
            else:
                feb = 28
            days = [31, feb, 31, 30, 30, 30, 31, 31, 30, 31, 30, 31]
            years = years +1
            if (i == year):
                stp = stop
            else:
                stp =12
            totmonth.append(stp)
            for j in range(start, stp):
                #print(months[j])
                arr.append(months[j])
                totdays.append(days[j])
                for k in range(1, days[j]+1):
                    day = str(j) + str(k)
                    date = [[day]]
                    #print(date)
                    temp = tree_model_temprature.predict(date)[0]
                    humi = tree_model_humidity.predict(date)[0]
                    rain = tree_model_rainfall.predict(date)[0]

                    arrtemp.append(round(temp, 2))
                    arrhumi.append(round(humi, 2))
                    arrrain.append(round(rain, 2))
            start = 0
        print(arrtemp)
        return {
            'temp': arrtemp,
            'humi': arrhumi,
            'rain': arrrain,
            'years': arryears,
            'months': arr,
            'days': totdays,
            'totalmonth': totmonth
        }

            


if __name__ == '__main__':
    app.run()