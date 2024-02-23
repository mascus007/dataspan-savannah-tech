export function getImageNameFormKey(imageUrl: string){
    const imagePath = imageUrl?.split(".")?.[0]
    const namePath = imagePath?.split("/");
    const name = namePath[namePath.length - 1];
    return name
}

export async function getFileContent(labelUrl: string){
    let labelContent = ""
    const response = await fetch(labelUrl);
    if (response.ok) {
      labelContent = await response.text();
    }
    return labelContent
  }