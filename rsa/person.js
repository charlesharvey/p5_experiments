class Person {




    constructor(name) {

        this.name = name;
        this.encrypted_message;
        this.decrypted_message;
        this.message;

        this.makeKeyPair();

        this.setMessage(null);
        this.doEncryption();

    }


    makeKeyPair() {

        // Choose two distinct prime numbers p and q.
        // For security purposes, the integers p and q should be chosen at random, and should be similar in magnitude but differ in length by a few digits to make factoring harder.[2] Prime integers can be efficiently found using a primality test.
        // p and q are kept secret.
        this.p = random(primes);
        this.q = random(primes);


        // Compute n = pq.
        // n is used as the modulus for both the public and private keys. Its length, usually expressed in bits, is the key length.
        // n is released as part of the public key.
        this.n = this.p * this.q;

        // Compute λ(n), where λ is Carmichael's totient function.
        // Since n = pq, λ(n) = lcm(λ(p),λ(q)), 
        // and since p and q are prime, λ(p) = φ(p) = p − 1 and likewise λ(q) = q − 1. 
        //Hence λ(n) = lcm(p − 1, q − 1).
        // λ(n) is kept secret.
        this.lambda = this.lcm(this.p - 1, this.q - 1);


        // The lcm may be calculated through the Euclidean algorithm, since lcm(a,b) = |ab|/gcd(a,b).
        // Choose an integer e such that 1 < e < λ(n) and gcd(e, λ(n)) = 1; that is, e and λ(n) are coprime.
        // e having a short bit-length and small Hamming weight results in more efficient encryption  – the most commonly chosen value for e is 2^16 + 1 = 65,537. The smallest (and fastest) possible value for e is 3, but such a small value for e has been shown to be less secure in some settings.[14]
        // e is released as part of the public key.
        this.e = 17; // //random(primes); //  Math.pow(2, 16) + 1; // 17




        // Determine d as d ≡ e^−1 (mod λ(n)); that is, d is the modular multiplicative inverse of e modulo λ(n).
        // This means: solve for d the equation d⋅e ≡ 1 (mod λ(n)); d can be computed efficiently by using the Extended Euclidean algorithm, since, thanks to d and λ(n) being coprime, said equation is a form of Bézout's identity, where d is one of the coefficients.
        // d is kept secret as the private key exponent.
        this.d = this.modInverse(this.e, this.lambda);


        // The public key consists of the modulus n and the public (or encryption) exponent e. 
        this.public_key = { modulus: this.n, exponent: this.e };

        // The private key consists of the private (or decryption) exponent d,
        // which must be kept secret. p, q, and λ(n) must also be kept secret because they can be used to calculate d. In fact, they can all be discarded after d has been computed.[15]
        this.private_key = { d: this.d, p: this.p, q: this.q, lambda: this.lambda };

        if (isNaN(this.d)) {
            console.log('d is not a number');
            this.makeKeyPair();
        }

    }

    setMessage(message) {
        this.message = random([1032745, 5443, 144, 2011064]);
        //  badchef, feed, bee, cabbage;
        // Math.round(random(120, 500000));


        this.message_letters = this.setMessageAsLetters(this.message);


        // if (message) {
        //     this.message = message;
        // } else {
        //     this.message = 'cat'; // Math.round(random(120, 700));
        // }

        // this.setMessageAsNumbers();

    }

    setMessageAsLetters(message) {
        const letters = message.toString().split('');
        const results = [];
        letters.forEach(n => {
            const number = this.numberToLetter(n);
            results.push(number);
        });

        return results;
    }
    setMessageAsNumbers() {
        const letters = this.message.toString().split('');
        const results = [];
        letters.forEach(letter => {
            const number = this.letterToNumber(letter);
            results.push(number);
        });

        this.message_as_number = results;
    }

    doEncryption() {
        this.encrypted_message = this.encrypt(this.message);
        this.decrypted_message = this.decrypt(this.encrypted_message);
        this.encrypted_message_as_letters = this.setMessageAsLetters(this.encrypted_message);
        this.decrypted_message_as_letters = this.setMessageAsLetters(this.decrypted_message);


        if (this.decrypted_message !== this.message) {
            this.makeKeyPair();
            this.doEncryption();
            // console.log('noo encryption didnt work');
        }

    }





    encrypt(message) {
        //{\displaystyle m^{e}\equiv c{\pmod {n}}}
        return this.modular_exponentiation(message, this.public_key.exponent, this.public_key.modulus);
        // const results = [];

        // this.message_as_number.forEach(number => {

        //     const en = this.modular_exponentiation(number, this.private_key.d, this.public_key.modulus);
        //     results.push(en);
        // });
        // return results;

    }


    decrypt(message) {

        // Alice can recover m from c by using her private key exponent d by computing
        // c d ≡ (m e ) d ≡ m(mod n)
        return this.modular_exponentiation(message, this.private_key.d, this.public_key.modulus);
        // const results = [];
        // console.log(this.encrypted_message);
        // this.encrypted_message.forEach(number => {

        //     const en = this.modular_exponentiation(number, this.private_key.d, this.public_key.modulus);
        //     results.push(en);
        // });
        // console.log(results);
        // return results;


    }


    modular_exponentiation(base, exponent, modulus) {


        if (modulus == 1) {
            return 0
        }
        let result = 1;
        base = base % modulus;
        while (exponent > 0) {
            if (exponent % 2 == 1) {
                result = (result * base) % modulus;
            }
            exponent = Math.floor(exponent / 2);
            base = (base * base) % modulus;
        }
        return result;



        // return Math.pow(m, e) % n;
    }



    lcm(x, y) { // least common multiple
        if ((typeof x !== 'number') || (typeof y !== 'number'))
            return false;
        return (!x || !y) ? 0 : Math.abs((x * y) / this.gcd_two_numbers(x, y));
    }



    gcd_two_numbers(x, y) {
        x = Math.abs(x);
        y = Math.abs(y);
        while (y) {
            var t = y;
            y = x % y;
            x = t;
        }
        return x;
    }


    modInverse(a, m) {
        // validate inputs
        [a, m] = [Number(a), Number(m)]
        if (Number.isNaN(a) || Number.isNaN(m)) {
            return NaN // invalid input
        }
        a = (a % m + m) % m
        if (!a || m < 2) {
            return NaN // invalid input
        }
        // find the gcd
        const s = []
        let b = m
        while (b) {
            [a, b] = [b, a % b]
            s.push({ a, b })
        }
        if (a !== 1) {
            return NaN // inverse does not exists
        }
        // find the inverse
        let x = 1
        let y = 0
        for (let i = s.length - 2; i >= 0; --i) {
            [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
        }
        return (y % m + m) % m
    }


    letterToNumber(letter) {
        const alphabet = '0abcdefghijklmnopqrstuvwxyz'.split('');
        return alphabet.indexOf(letter);
    }
    numberToLetter(number) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const i = number % 26;
        return alphabet[i];
    }

}