import cloudinary.uploader

def upload_file_to_cloudinary(file, resource_type="auto"):
    """
    Upload a file to Cloudinary
    :param file: File object to upload
    :param resource_type: Type of resource (auto, image, video, raw)
    :return: Dictionary containing upload response
    """
    try:
        upload_result = cloudinary.uploader.upload(
            file,
            resource_type=resource_type,
            folder="ajali"  # This will create/use an 'ajali' folder in your Cloudinary account
        )
        return {
            'url': upload_result['secure_url'],
            'public_id': upload_result['public_id']
        }
    except Exception as e:
        raise Exception(f"Failed to upload file to Cloudinary: {str(e)}")

def delete_file_from_cloudinary(public_id, resource_type="auto"):
    """
    Delete a file from Cloudinary
    :param public_id: Public ID of the resource to delete
    :param resource_type: Type of resource (image, video, raw)
    :return: Dictionary containing deletion response
    """
    try:
        result = cloudinary.uploader.destroy(public_id, resource_type=resource_type)
        return result
    except Exception as e:
        raise Exception(f"Failed to delete file from Cloudinary: {str(e)}")