from django.utils.translation import gettext as _
from .models import Translation, Language

def get_translated_content(model_name, field_name, object_id, language_code='en'):
    try:
        translation = Translation.objects.get(
            model_name=model_name,
            field_name=field_name,
            object_id=object_id,
            language__code=language_code
        )
        return translation.translated_text
    except Translation.DoesNotExist:
        return None

def translate_model_data(instance, fields_to_translate, language_code):
    translated_data = {}
    model_name = instance.__class__.__name__
    
    for field in fields_to_translate:
        translated_content = get_translated_content(
            model_name,
            field,
            instance.id,
            language_code
        )
        if translated_content:
            translated_data[field] = translated_content
        else:
            translated_data[field] = getattr(instance, field)
    
    return translated_data