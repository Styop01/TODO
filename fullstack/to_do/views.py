from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TodoTable
from .serializer import TodoSerializer
from .serializer import UpdateSerializer



def home(request):
    return render(request, 'main/to_do.html')

# TodoApiView class is handling functionality when receving requests.

class TodoApiView(APIView):
     
# get request's function

    def get(self, request):
        a = TodoTable.objects.all()
        return Response({"get request": TodoSerializer(a, many=True).data})

# post request's function

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"post request": serializer.data})

# delete request's function

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)

        if not pk:
            return Response({"ERROR": "Delete Method Is Not Allowed"})

        try:
            instance = TodoTable.objects.get(pk=pk)
            instance.delete()
        except:
            return Response({"ERROR": "Object Not Found !"})
        

        return Response({"Post": f"Object {str(pk)} is deleted"})
    
# put request's function

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        
        if not pk:
            return Response({"Error": "Method PUT not defined"})

        try:
            instance = TodoTable.objects.get(pk=pk)
        except:
            return Response({"Error": "Object does not exists"})
        
        serializer = UpdateSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"Post": serializer.data})
