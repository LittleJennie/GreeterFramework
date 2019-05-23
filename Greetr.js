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

    Greeter.prototype = {
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        validate: function() {
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw 'Invalid Language';
            }
        },
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName;
        }, 
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        greet: function(formal) {
            var msg; 

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
        },
        setLang: function(lang) {
            this.language = lang;

            this.validate();

            return this;
        }, 
        HTMLGreeting: function(selector, formal) {
            if(!$) {
                throw 'jQuery not loaded.';
            }

            if(!selector) {
                throw 'Missing jQuery selector';
            }

            var msg;
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            $(selector).html(msg);

            return this;
        }
    };

    Greeter.init = function(firstName, lastName, language) {

        var self = this;

        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

    }

    Greeter.init.prototype = Greeter.prototype;

    global.G$ = global.Greeter = Greeter;

    Greeter();

}(window, jQuery));