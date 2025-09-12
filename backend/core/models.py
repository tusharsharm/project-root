from django.db import models
from django.utils.text import slugify
from django.utils import timezone

class Blog(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    excerpt = models.TextField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to="blogs/", blank=True, null=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug and self.title:
            self.slug = slugify(self.title)[:200]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title or "Untitled"


class Project(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=50, null=True, blank=True)
    image = models.ImageField(upload_to='projects/', null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, null=True, blank=True)
    impact_numbers = models.JSONField(default=dict, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    def __str__(self):
        return self.title or "Untitled"


class Report(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)
    file = models.FileField(upload_to="reports/", null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    def __str__(self):
        return self.title or "Untitled"


class GalleryImage(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to="gallery/", null=True, blank=True)
    caption = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)


class TeamMember(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    role = models.CharField(max_length=200, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    photo = models.ImageField(upload_to="team/", blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    def __str__(self):
        return f"{self.name or 'Unknown'} ({self.role or 'Role'})"


class ContactMessage(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    subject = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField(null=True, blank=True)
    replied = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    def __str__(self):
        return f"{self.name or 'Unknown'} - {self.subject or 'Contact'}"


class Donation(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Completed", "Completed"),
    ]

    donor = models.CharField(max_length=255, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    purpose = models.CharField(max_length=255, null=True, blank=True)
    date = models.DateField(default=timezone.now, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")

    def __str__(self):
        return f"{self.donor or 'Anonymous'} - {self.amount or 0}"


class Volunteer(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Active", "Active"),
    ]

    name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    area = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    join_date = models.DateField(default=timezone.now, null=True, blank=True)

    def __str__(self):
        return self.name or "Unknown"


class About(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)
    subtitle = models.TextField(blank=True, null=True)
    mission = models.TextField(null=True, blank=True)
    vision = models.TextField(null=True, blank=True)
    story = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="about/", blank=True, null=True)
    values_intro = models.TextField(blank=True, null=True)
    values = models.JSONField(default=list, blank=True, null=True)
    updated_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    def __str__(self):
        return self.title or "About"


class Contact(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    status = models.CharField(max_length=20, choices=[
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved')
    ], default='new')


class Gallery(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='gallery/', null=True, blank=True)
    category = models.CharField(max_length=50, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Galleries"
        ordering = ['-created_at']

    def __str__(self):
        return self.title or "Gallery"


class Event(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    date = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to='events/', null=True, blank=True)
    status = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)


class Impact(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    number = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    icon = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)


class Testimonial(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    role = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='testimonials/', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)


class Career(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    requirements = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    type = models.CharField(max_length=50, null=True, blank=True)
    status = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)


class Language(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    code = models.CharField(max_length=10, null=True, blank=True)
    is_default = models.BooleanField(default=False)


class Translation(models.Model):
    language = models.ForeignKey(Language, on_delete=models.CASCADE, null=True, blank=True)
    model_name = models.CharField(max_length=100, null=True, blank=True)
    field_name = models.CharField(max_length=100, null=True, blank=True)
    object_id = models.IntegerField(null=True, blank=True)
    translated_text = models.TextField(null=True, blank=True)

    class Meta:
        unique_together = ('language', 'model_name', 'field_name', 'object_id')


class Newsletter(models.Model):
    email = models.EmailField(unique=True, null=True, blank=True)
    subscribed_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.email or "Unknown"
