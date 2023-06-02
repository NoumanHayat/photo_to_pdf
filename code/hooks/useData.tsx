/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
export const DataContext = React.createContext({});
import ReactNativeBlobUtil from 'react-native-blob-util';
import { Dirs, FileSystem } from 'react-native-file-access';
import download from 'downloadjs';
import { promisify } from 'util';
// import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const ip = '192.168.43.106';
  const Testing = async () => {
    console.log('Code');
  };
  const ConvertApi = async (dataUrl: string | any[], title: any, checked: any, emailAddress: any, width: any, height: any) => {
    console.log('data');
    const date = new Date();
    const fileName = date.getTime().toString() + title;

    // const data = new FormData();
    // for (let i = 0; i < dataUrl.length; i++) {
    //   await data.append('image', {
    //     name: dataUrl[i].path.split('/').pop(),
    //     type: dataUrl[i].mime,
    //     uri: dataUrl[i].path,
    //   });
    // }
    // await data.append("title", title);
    // await data.append("email", checked);
    // await data.append("emailAddress", emailAddress);
    // await data.append("width", width);
    // await data.append("height", height);
    // console.log("data");
    const demeData = [{ 'height': 448, 'mime': 'image/jpeg', 'modificationDate': '1685633298000', 'path': 'file:///data/user/0/com.photo_to_pdf/cache/react-native-image-crop-picker/IMG-20230601-WA0000.jpg', 'size': 57525, 'width': 794 }];

    ReactNativeBlobUtil
      .config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `/storage/emulated/0/Download/${fileName}.pdf`,
          description: 'Working',
        },

      },)
      .fetch('POST', `http://${ip}:3000/api/DocxToPDFConvert`, {
        'Content-Type': 'multipart/form-data',
      },
        // [
        //   {name:'download',date:'date'}
        // ]
        [
          { name: 'name', data: 'user' },
          {
            name: 'info', data: JSON.stringify({
              mail: 'example@example.com',
              tel: '12345678',
            }),
          },
        ]
      )
      .then(async (res) => {
        console.log('The file saved to ');
        ReactNativeBlobUtil.MediaCollection
      }).catch((err) => {
        console.log('Not Done');
      });

    // ReactNativeBlobUtil
    // .fetch('POST', `http://${ip}:3000/api/DocxToPDFConvert`, {
    //   Authorization : "Bearer access-token",
    //   otherHeader : "foo",
    //   'Content-Type' : 'multipart/form-data',
    // }, [
    // { name : 'name', data : 'user'},
    // { name : 'info', data : JSON.stringify({
    //   mail : 'example@example.com',
    //   tel : '12345678'
    // })},
    // ])
    // .then((resp) => {
    //   console.log("Done")
    // }).catch((err) => {
    //   console.log("Not Done")
    //   // ...
    // })


    // try {
    //   const response = await axios({
    //     method: 'post',
    //     url: `http://${ip}:3000/api/DocxToPDFConvert`,
    //     data: demeData,
    //     headers: {
    //       'Content-Type': `multipart/form-data`,
    //     },
    //   });
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    //     );
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       console.log("Permission granted");
    //       var path = `/storage/emulated/0/Download/${title}.pdf`;
    //       console.log(path);
    //       // const content = response.headers['application/pdf'];

    //       download(response.data, path, 'application/pdf')

    //       // RNFS.writeFile(path, response.data,)
    //       //   .then(() => console.log('FILE WRITTEN!'))
    //       //   .catch((err) => console.log(err.message));
    //     } else {
    //       console.log('Permission denied');
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const Test =() => {console.log('Ok');}
  const contextValue = {
    Testing,
    ConvertApi,
    Test,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
function alert(message: any) {
  throw new Error('Function not implemented.');
}

