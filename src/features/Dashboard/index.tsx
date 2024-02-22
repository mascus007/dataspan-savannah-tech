import ButtonDot from "@/components/buttons";
import PhotosPlacerholder from "@/components/placeholders";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AllGroups from "./AllGroups";
import Train from "./Train";
import Valid from "./Valid";
import Test from "./Test";

export default function DashboardView() {

    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState<any>({allGroups:[], test: [], train:[], valid:[]});
    const [currentAlbum, setCurrentAlbum] = useState<string | null>(null);
    const [tab, setTab] = useState<number>(1);
    const [activePhotoCount, setActivePhotoCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    viewAlbum("bone-fracture-detection");
    alert("I spent about six hrs on the assignment")
  }, []);

  // const listAlbums = () => {
  //   setIsLoading(true)
  //   fetch('/api/list-albums')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAlbums(data.albums);
  //       viewAlbum(data.albums[0]);
  //     })
  //     .catch((error) => console.error('Error fetching albums:', error));
  // };

  const viewAlbum = (albumName: string) => {
    setIsLoading(true)
    fetch(`/api/view-album?albumName=${encodeURIComponent(albumName)}`)
      .then((response) => (response.json()))
      .then((data) => {
        setPhotos(data);
        setCurrentAlbum(albumName);
        const totalCountAll = photos?.allGroups?.length
        if(totalCountAll)setActivePhotoCount(totalCountAll)
        setIsLoading(false)
      })
      .catch((error) => console.error('Error fetching photos:', error));
  };

  const handleOnTabClick = (tab: number) =>{
    setTab(tab)
   
    switch (tab) {
      case 1:
        const totalCountAll = photos?.allGroups?.length
        if(totalCountAll)
        return setActivePhotoCount(totalCountAll)
      case 2:
        const totalCountTrain = photos?.train?.length
        if(totalCountTrain)
        return setActivePhotoCount(totalCountTrain)
      case 3:
        const totalCountValid = photos?.valid?.length
        if(totalCountValid)
        setActivePhotoCount(totalCountValid)
      case 4:
        const totalCountTest = photos?.test?.length
        if(totalCountTest) 
        return setActivePhotoCount(totalCountTest)
      default:
        break;
    }
   
  }
  const handleSelected = (select:number) => {
    setSelected(select)
  }

  const selection = [
    {
      tab: 1,
      label: "Select all",
      handleOnSelect: () => handleSelected(1)
    },
    {
      tab: 2,
      label: "Deselect all",
      handleOnSelect: () => handleSelected(2)
    }
  ]

  const menus = [
    {
      tab: 1,
      label: "All groups",
      handleOnclick: () => handleOnTabClick(1)
     
    },
    {
      tab: 2,
      label: "Train",
      handleOnclick: () => handleOnTabClick(2)
    },
    {
      tab: 3,
      label: "Valid",
      handleOnclick: () => handleOnTabClick(3)
     
    },
    {
      tab: 4,
      label: "Test",
      handleOnclick: () => handleOnTabClick(4)
     
    }
  ]

  const getTabContent = (tab : number) =>{
    const contentObj = {
      1: <AllGroups photos={photos?.allGroups || []}/>,
      2: <Train photos={photos?.train || []}/>,
      3: <Valid photos={photos?.valid || []}/>,
      4: <Test photos={photos?.test || []}/>,
    } as any

    return contentObj[tab]
  }
  
    
  return (
    <div>
    <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-[25%]">
            <div className="border-[#D1D1D6] border rounded-lg p-5 lg:h-screen xl:h-screen md:h-screen">
                <Image src="/assets/images/logo.svg" width={200} height={200} alt="" className="w-[350px]" />
                <p className="mt-10 font-[600] text-[15px]">Classes filter</p>
                <p className="mt-10">
                    {selection.map((sel, idx:number) => (
                      <Link key={idx} 
                          href={"#"} 
                          onClick={sel.handleOnSelect} 
                          className={`me-5 ${sel.tab == selected ? "text-[#2081D2]" :"text-gray-300"}`}>{sel.label}</Link>
                    ))}
                </p>
                <div className="mt-3 flex-wrap gap-4 flex">
                    <ButtonDot btnColor="btn-primary active"  type="button">Elbow positive</ButtonDot>
                    <ButtonDot btnColor="btn-success"  type="button">Fingers positive</ButtonDot>
                    <ButtonDot btnColor="btn-secondary"  type="button">Humerus</ButtonDot>
                    <ButtonDot btnColor="btn-warning"  type="button">Forearm fracture</ButtonDot>
                    <ButtonDot btnColor="btn-danger"  type="button">Humerus fracture</ButtonDot>
                    <ButtonDot btnColor="btn-warning2"  type="button">Shoulder fracture</ButtonDot>
                    <ButtonDot btnColor="btn-secondary2"  type="button">Wrist positive</ButtonDot>
                </div>
            </div>
        </div>
        <div className="lg:w-[75%]">
            <div className="px-5">
                <div className="flex justify-between">
                    <div className="text-[32px] font-[600] ">Bone-fracture-detection </div>
                    <div className="mt-3">
                        <span> <span className="font-[600]">{activePhotoCount}</span> images</span>
                    </div>
                </div>
                <div className="flex border-b border-gray-300 mt-5">
                  {menus.map((menu, idx:number) => (
                    <button key={idx} 
                      onClick={menu.handleOnclick}
                      className={`${tab == menu.tab ? "font-[600] border-b-2 bg-[#ffd75c42] text-[#FFD75C] border-[#FFD75C]" : "text-gray-700"} 
                        hover:font-[600] hover:border-b-2 px-5 py-2  hover:bg-[#ffd75c42] focus:border-[#FFD75C] active:bg-[#ffd75c42] hover:text-[#FFD75C] me-2`}>
                        {menu.label}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center mt-5">
                  {isLoading ? <PhotosPlacerholder showCount={16}/> :
                  getTabContent(tab)
                  }
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}
