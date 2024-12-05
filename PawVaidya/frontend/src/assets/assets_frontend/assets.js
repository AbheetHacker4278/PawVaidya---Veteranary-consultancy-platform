import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg' 
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
}

export const specialityData = [
    {
        speciality: 'Marine vet',
        image: General_physician
    },
    {
        speciality: 'Small animal vet',
        image: Gynecologist
    },
    {
        speciality: 'Large animal vet',
        image: Dermatologist
    },
    {
        speciality: 'Military vet',
        image: Pediatricians
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Kumar Raj',
        image: doc1,
        speciality: 'Marine Vet',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        f_address : "NaN_Nasajdnasdnaosn",
        address: {
            Location : "New Delhi",
            line: 'Connaught Place',
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Divya Kumari',
        image: doc2,
        speciality: 'Small Animal Vet',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        f_address : "NaN_NaN",
        address: {
            Location : "Mumbai",
            line: 'Andheri',
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Ashish Patel',
        image: doc3,
        speciality: 'Small Animal Vet',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        f_address : "NaN_NaN",
        address: {
            Location : "Gujarat",
            line: 'Surat',
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Raman Raj',
        image: doc4,
        speciality: 'Military vet',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        f_address : "Nan_NaN",
        address: {
            Location : "Haryana",
            line: 'Panipat',
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Sakshi Dey',
        image: doc5,
        speciality: 'Military vet',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        f_address : "NaN_NaN",
        address: {
            Location : "New Delhi",
            line: 'Dwarka',
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Arihant Rajput',
        image: doc6,
        speciality: 'Marine Vet',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        f_address : "NaN_NaN",
        address: {
            Location : "Gujarat",
            line: 'Ahmedabad',
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Rohan Mishra',
        image: doc7,
        speciality: 'Large Animal Vet',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        f_address : "NaN_NaN",
        address: {
            Location : "Haryana",
            line: 'Gurgaon',
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Mohit Chand',
        image: doc8,
        speciality: 'Large Animal Vet',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        f_address : "NaN_NaN",
        address: {
            Location : "New Delhi",
            line: 'Karol Bagh',
        }
    },
    {
        _id: 'doc9',
        name: 'Pinki rana',
        image: doc9,
        speciality: 'Marine Vet',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        f_address : "NaN_NaN",
        address: {
            Location : "Gujarat",
            line: 'Ahmedabad',
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Abhishek Sahu',
        image: doc10,
        speciality: 'Military vet',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        f_address : "NaN_NaN",
        address: {
            Location : "New Delhi",
            line: 'Connaught Place',
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Military Animal Vet',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        f_address : "NaN_NaN",
        address: {
            Location : "Mumbai",
            line: 'Juhu',
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Large Animal Vet',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        f_address : "NaN_NaN",
        address: {
            Location : "Mumbai",
            line: 'Borivali',
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'Small Animal Vet',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        f_address : "NaN_NaN",
        address: {
            Location : "Mumbai",
            line: 'Andheri',
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Marine Vet',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        f_address : "NaN_NaN",
        address: {
            Location : "Gujarat",
            line: 'Vadodara',
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Military vet',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        f_address : "NaN_NaN",
        address: {
            Location : "New Delhi",
            line: 'Dwarka',
        }
    },
]

export default assets;