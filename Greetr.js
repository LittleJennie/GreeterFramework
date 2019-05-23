(function(global, $){

    //declare a new object
    var Greeter = function(firstName, lastName, language) {
        return new Greeter.init(firstName, lastName, language);
    }

    //hidden within the scope of the IIFE and never directly accessible 
    var supportedLanguages = ['en', 'es'];

    //informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Holla'
    };

    //formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    //logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Incio sesion'
    }

    //prototype to hold methods for saving memory space
    Greeter.prototype = {

        // 'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },

        //validate if language is within the framework
        //references the externally inaccessible 'supportedLangs' within the closure
        validate: function() {
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw 'Invalid Language';
            }
        },

        // retrieve messages from object by referring to properties using [] syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName;
        }, 
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        // chainable methods return their own containing object
        greet: function(formal) {
            var msg; 

            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            //'this' refers to the calling object at the time of execution
            //making the method chainable. 
            return this;
        }, 

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + this.fullName());
            }

            return this;
        },

        setLang: function(lang) {

            //set the languge
            this.language = lang;

            //validate the language
            this.validate();

            //return the calling object at the time of execution
            return this;
        }, 

        HTMLGreeting: function(selector, formal) {
            if(!$) {
                throw 'jQuery not loaded.';
            }

            if(!selector) {
                throw 'Missing jQuery selector';
            }

            //determine the message
            var msg;
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            // inject the message in the chosen place in the DOM
            $(selector).html(msg);

            //make chainable
            return this;
        }
    };

    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greeter.init = function(firstName, lastName, language) {

        var self = this;

        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();

    }

    //link methods created in Greeter.prototype to the 'new' object
    Greeter.init.prototype = Greeter.prototype;

    // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
    global.G$ = global.Greeter = Greeter;

}(window, jQuery));