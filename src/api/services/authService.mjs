// services/authService.mjs

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';
import Profile from '../models/candidateProfileModel.mjs';
import ProfileEntreprise from '../models/entrepriseProfileModel.js';
import sequelize from '../config/sequelize.mjs';

async function registerCandidate(accountType, userData){
    const newUser = await User.create({
        password: userData.password,
        email :userData.email,
        role: accountType,
        phone_number: userData.phone_number,
        creation_date: new Date()
    })
    const newProfile = await Profile.create({
      userID :newUser.userID,
      first_name: userData.first_name,
      last_name: userData.last_name,
      wilaya: userData.wilaya,
      gender: userData.gender,
      birth_date: new Date()
    }) 
    newProfile.save()
    newUser.save().then(savedItem => {
    console.log('Item added successfully:', savedItem);
  })
  .catch(error => {
    console.error('Error adding item:', error);
  });
}

async function registerEnterpriseUser(accountType, userData){
  const newUser = await User.create({
      password: userData.password,
      email :userData.email,
      role: accountType,
      phone_number: userData.phone_number,
      creation_date: new Date()
  })
  const newProfile = await ProfileEntreprise.create({
    userID :newUser.userID,
    name: userData.name,
    headquarter_state: userData.headquarter_state,
    fieldID: userData.fieldID,
    website: userData.website
  }) 
  newProfile.save()
  newUser.save().then(savedItem => {
  console.log('Item added successfully:', savedItem);
})
.catch(error => {
  console.error('Error adding item:', error);
});
}

async function login(email,password){
  const user = await User.findOne({ where: { email } });
  if (!user){
    console.log("user doesn't exist")
  }
  else{
    if (user.password === password){
      console.log("good password")
    }
    else{
      console.log("wrong password")
    }
  }
  
}

export {registerCandidate,registerEnterpriseUser,login};

