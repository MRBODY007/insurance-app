import mongoose from 'mongoose';

const PremiumSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  genderCd: String,
  dob: String,
  planCode: String,
  premiumPerYear: Number,
  paymentFrequency: String,
  benefitAmount: Number
});

export const Premium = mongoose.model('Premium', PremiumSchema);
