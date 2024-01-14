from django.shortcuts import render
from django.views import APIView
import json
from .serializers import *
from rest_framework.response import Response

# Create your views here.

class UserView(APIView):
    def POST(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created succesfully"} , status=201)
        return Response(serializer.errors , status=400)


