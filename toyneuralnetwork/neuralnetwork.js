class Neuralnetwork {


    constructor(i, h, o) {
        this.input_nodes = i;
        this.hidden_nodes = h;
        this.output_nodes = o;


        this.weights_ih = new Matrix(h, i);
        this.weights_ho = new Matrix(o, h);
        this.weights_ih.randomize();
        this.weights_ho.randomize();


        this.bias_h = new Matrix(h, 1);
        this.bias_o = new Matrix(o, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();

        this.learning_rate = 0.1;
    }





    feedforward(input_array) {

        let inputs = Matrix.fromArray(input_array);

        const hidden = this.feedForwardGetHidden(inputs);
        const outputs = this.feedForwardGetOutputs(hidden);

        return outputs.toArray();
    }


    feedForwardGetHidden(inputs) {

        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        // activation function
        hidden.map(Neuralnetwork.sigmoid);
        return hidden;
    }


    feedForwardGetOutputs(hidden) {
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(Neuralnetwork.sigmoid);
        return outputs;
    }










    train(input_array, targets_array) {

        let inputs = Matrix.fromArray(input_array);
        let hidden = this.feedForwardGetHidden(inputs);
        let outputs = this.feedForwardGetOutputs(hidden);


        const targets = Matrix.fromArray(targets_array);

        // calculate error based on how
        // far the output was from the target
        const outputs_errors = Matrix.subtract(targets, outputs);


        //  gradient 
        let gradients = Matrix.map(outputs, Neuralnetwork.dsigmoid);
        gradients.multiply(outputs_errors);
        gradients.multiply(this.learning_rate);


        // // divide up error between the hidden neurons
        // // based on how strong their weights are
        let hidden_t = Matrix.transpose(hidden);
        let weights_ho_delta = Matrix.multiply(gradients, hidden_t);
        this.weights_ho.add(weights_ho_delta);
        this.bias_o.add(gradients);

        let weight_ho_t = Matrix.transpose(this.weights_ho)
        let hidden_errors = Matrix.multiply(weight_ho_t, outputs_errors)
        let hidden_gradient = Matrix.map(hidden, Neuralnetwork.dsigmoid);

        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learning_rate);


        let inputs_t = Matrix.transpose(inputs);
        let weights_ih_delta = Matrix.multiply(hidden_gradient, inputs_t);
        this.weights_ih.add(weights_ih_delta);
        this.bias_h.add(hidden_gradient);

        return true;
    }



    predict() {

    }


    static sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }


    static dsigmoid(x) {
        const s = x;
        // dont need to sigmoid  becaseu its been done before
        // const s = Neuralnetwork.sigmoid(x);
        return s * (1 - s);
    }

}