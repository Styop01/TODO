from django.db import models


# TodoTable database

class TodoTable(models.Model):
    id = models.IntegerField(primary_key=True)
    content = models.TextField(max_length=50)
    checked = models.TextField(max_length=10, blank=True)

    def __str__(self):
        return self.content
