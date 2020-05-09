from django.contrib import admin

from api.models import FilesToCourse, Course


class FileToCourseAdmin(admin.ModelAdmin):
    exclude = ()


class CourseAdmin(admin.ModelAdmin):
    exclude = ()


admin.site.register(FilesToCourse, FileToCourseAdmin)
admin.site.register(Course, CourseAdmin)
