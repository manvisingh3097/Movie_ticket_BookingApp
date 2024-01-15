from django.shortcuts import render
from rest_framework.views import APIView
import json
from .serializers import *
from rest_framework.response import Response

# Create your views here.

class UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created succesfully"} , status=201)
        return Response(serializer.errors , status=400)
    
    def get(self, request):
        #
        uname = request.GET.get("username" , None)
        users_list = User.objects.all()
        userdetail = users_list.filter(username__iexact=uname)
        return Response(userdetail.values() , status=201)
    

    def put(self, request):
        uname = request.data["username"]
        userdetail = User.objects.get(username__iexact=uname)
        serializer = UserSerializer(userdetail,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account updated succesfully"} , status=201)
        return Response(serializer.errors , status=400)
        
    
    def delete(self,request):
        userdetail = User.objects.get(username=request.data["username"])
        userdetail.delete()
        return Response(status=204)
    
class MovieView(APIView):
    def get(self, request):

        movie_list = Movie.objects.all().values()
        return Response(movie_list , status=200)
    
    def post(self, request):
        #permission = isuthenticated()

        serializer = MovieSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Movie added succesfully"} , status=201)
        return Response(serializer.errors , status=400)
    
    def put(self, request): 
        mname = request.data["moviename"]
        moviedetail = Movie.objects.get(moviename__iexact=mname)
        serializer = MovieSerializer(moviedetail, data= request.data , partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Movie updated succesfully" } , status=201) 
        return Response(serializer.errors, status=400)
    
    def delete(self , request) : 
        moviedetail = Movie.objects.get(moviename= request.data["moviename"])
        moviedetail.delete()
        return Response({"message: movie deleted succesfully"} , status=204)
    
class TicketView(APIView):
    def get(self, request):
        utickets = request.GET.get("username" , None)

    def post(self,request):
        serializer = TicketSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Ticket Booked succesfully"} , status=201)
        return Response(serializer.errors , status=400)


            

        

    

    






