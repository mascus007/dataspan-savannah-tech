export function getImageNameFormKey(imageUrl: string){
    const imagePath = imageUrl?.split(".")?.[0]
    const namePath = imagePath?.split("/");
    const name = namePath[namePath.length - 1];
    return name
}