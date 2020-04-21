from django.contrib import admin

from api.models import FilesToCourse


class FileToCourseAdmin(admin.ModelAdmin):
    exclude = ()


admin.site.register(FilesToCourse, FileToCourseAdmin)

