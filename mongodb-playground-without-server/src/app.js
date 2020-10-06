const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');
mongoose.connection
  .once('open', () => console.log('Connected'))
  .on('error', error => {
    console.warn('Warning', error);
  });

//MODEL

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const User = mongoose.model('User', UserSchema);

const emma = new User({
  name: 'Emmanuel',
});

// Creating User
const createUser = async () => {
  const emma = new User({
    name: 'Emmanuel',
  });

  await emma.save();
  console.log(emma);
};

//QUERIES

//Model.find({}) : Find all the users that match the given criteria. Returns ann array

//Model.findOne({name: 'Emmanuel}) : Find the user that matches the criteria. It returns an object

//All these methods are tired to the model /class of user directly

//Find users by name emmanuel

//Find One
const findUser = async () => {
  const user = await User.findOne({ name: 'Emmanuel' });
  console.log(user);
};
//findUser(); //This returns object of users by name Emmanuel

//find

const findUsers = async () => {
  const user = await User.find({ name: 'Emmanuel' });
  console.log(user);
};

//findUsers(); //This returns array of users by name Emmanuel

//Find a particular record

//Model.findById();

const findAparticularRecord = async () => {
  const user = await User.findOne({ _id: '5f5f20b113dcf831bfd9fe78' });
  console.log(user);
};

//findAparticularRecord();

//======DELETING RECORD====
//This is a class method so it's worked on the  the model created
//remove()
//findOneAndRemove()
//findByIdAndRemove()

//REMOVE()
const deletRecord = async () => {
  const user = await User.findOne({ _id: '5f5f22b605f06133b1266590' });
  const deleteUser = await user.remove();
  console.log(deleteUser);
};

//Class base method findOneAndRemove

//For this you can pass in any property to delete it eg either by name or email

const deletRecord2 = async () => {
  const user = await User.findOneAndRemove({ _id: '5f5f2265e1b36a3322544af2' });

  console.log('Deleted', user);
};

//Class base method findByIdAndRemove()

//For this you can only pass in the id

const deletRecord2 = async () => {
  const user = await User.findOneAndRemove({ _id: '5f5f2265e1b36a3322544af2' });

  console.log('Deleted', user);
};
