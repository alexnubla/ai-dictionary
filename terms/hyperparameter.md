---
title: "Hyperparameter"
category: "Training"
related: ["Learning Rate", "Training", "Optimizer", "Model Tuning", "Grid Search"]
date_added: 2026-08-13
---

# Hyperparameter

A configuration setting that is external to a machine learning model and controls the training process itself — set by the practitioner before training begins, rather than learned from data like model parameters (weights and biases).

## The Simple Version
Imagine you're baking a cake. The recipe has two types of settings:

**Parameters (learned from data):** The exact amount of flour, sugar, and eggs. You figure these out through experimentation — taste the batter, adjust until it's right. These are like the model's weights and biases, which the AI learns during training.

**Hyperparameters (set by you):** The oven temperature, baking time, and rack position. You set these *before* you start baking. They control *how* the cake bakes, but they're not part of the cake itself. If the cake burns, you might lower the temperature (adjust the hyperparameter) and try again.

In AI, hyperparameters are like the oven temperature. They control how the model learns (learning rate, batch size, number of layers) but aren't learned from the data. Choosing good hyperparameters is crucial for model performance, and finding the right values often requires experimentation.

## Detailed Explanation
Hyperparameters are the "knobs and dials" that practitioners adjust to optimize model training. Unlike model parameters (weights), which are updated automatically during training via gradient descent, hyperparameters are set manually (or via automated search) before training begins.

**Common Hyperparameters:**

**1. Model Architecture:**
- **Number of layers:** How deep is the neural network?
- **Number of neurons per layer:** How wide is each layer?
- **Activation function:** ReLU, GELU, sigmoid, etc.
- **Dropout rate:** Fraction of neurons to randomly disable during training (prevents overfitting)

**2. Optimization:**
- **Learning rate:** How big are the weight update steps? (Most critical hyperparameter)
- **Optimizer:** Adam, SGD, RMSprop, etc.
- **Batch size:** How many examples to process before updating weights?
- **Momentum:** How much to consider past gradients?
- **Weight decay:** Regularization strength to prevent overfitting

**3. Training Process:**
- **Number of epochs:** How many passes through the training data?
- **Early stopping patience:** How long to wait before stopping if validation loss doesn't improve?
- **Learning rate schedule:** How does the learning rate change over time? (warmup, decay)

**4. Regularization:**
- **L1/L2 regularization strength:** How much to penalize large weights?
- **Dropout rate:** (mentioned above)
- **Label smoothing:** How much to soften the target labels?

**5. Task-Specific:**
- **Temperature:** Controls randomness in LLM generation
- **Top-p / Top-k:** Sampling strategies for text generation
- **Context window size:** How much context the model can process

**Hyperparameter Tuning Strategies:**

**1. Manual Tuning:**
- Practitioner adjusts hyperparameters based on experience and intuition
- **Pros:** Fast, leverages domain knowledge
- **Cons:** Time-consuming, may miss optimal values

**2. Grid Search:**
- Define a grid of hyperparameter values to try
- Train a model for every combination
- **Pros:** Exhaustive, finds global optimum within grid
- **Cons:** Computationally expensive (exponential in number of hyperparameters)

**3. Random Search:**
- Randomly sample hyperparameter values from defined ranges
- **Pros:** More efficient than grid search, often finds good values faster
- **Cons:** May miss optimal values

**4. Bayesian Optimization:**
- Build a probabilistic model of the hyperparameter-performance relationship
- Use it to intelligently select the next hyperparameters to try
- **Pros:** Sample-efficient, finds good values with fewer trials
- **Cons:** More complex to implement
- **Tools:** Optuna, Ray Tune, Hyperopt

**5. Automated ML (AutoML):**
- Fully automated hyperparameter tuning and model selection
- **Pros:** Minimal human intervention
- **Cons:** Less control, may not find the absolute best solution
- **Tools:** Google AutoML, H2O.ai, Auto-sklearn

**The Hyperparameter-Performance Tradeoff:**
- Too few hyperparameters tuned: Model may underperform
- Too many hyperparameters tuned: Risk of overfitting to the validation set
- Optimal: Tune the most impactful hyperparameters (learning rate, batch size, model size)

## Key Characteristics
- **External to Model:** Not learned from data, set by practitioner
- **Controls Training:** Determines how the model learns, not what it learns
- **Task-Dependent:** Optimal values vary by dataset, model architecture, and task
- **Empirical:** Must be determined experimentally, not theoretically
- **Critical Impact:** Small changes can dramatically affect model performance

## Business Context
Hyperparameter tuning directly impacts model quality and training costs:

**Why It Matters:**
- **Model Performance:** Good hyperparameters can improve accuracy by 10-30%
- **Training Cost:** Poor hyperparameters (e.g., too many epochs) waste compute
- **Time to Market:** Efficient tuning reduces development time
- **Reproducibility:** Documenting hyperparameters ensures models can be recreated

**Enterprise Hyperparameter Strategies:**

**1. Start with Defaults:**
- Most frameworks provide reasonable default hyperparameters
- Good starting point, but often not optimal

**2. Focus on High-Impact Hyperparameters:**
- **Learning rate:** Most critical, tune first
- **Batch size:** Affects training stability and speed
- **Model size:** Number of layers/neurons
- **Regularization:** Dropout, weight decay

**3. Use Automated Tools:**
- **Optuna:** Open-source, easy to use, supports multiple strategies
- **Ray Tune:** Scalable, integrates with popular frameworks
- **Weights & Biases Sweeps:** Integrated with experiment tracking

**4. Document Everything:**
- Record all hyperparameters for each experiment
- Use experiment tracking tools (MLflow, W&B)
- Ensures reproducibility and knowledge sharing

**Cost of Poor Hyperparameter Tuning:**
- **Wasted Compute:** Training with bad hyperparameters wastes GPU hours
- **Suboptimal Models:** Poor performance leads to rework
- **Delayed Deployment:** Time spent manually tuning delays projects
- **Knowledge Loss:** Undocumented hyperparameters make models unreproducible

**Best Practices:**
- **Start Simple:** Begin with defaults, then tune systematically
- **Use Validation Sets:** Tune on validation data, evaluate on held-out test data
- **Avoid Overfitting:** Don't tune too many hyperparameters on the same validation set
- **Leverage Transfer Learning:** Use hyperparameters from similar tasks as starting points
- **Automate When Possible:** Use Bayesian optimization for efficiency

## Real-World Analogy
Tuning a car engine. The engine's internal components (pistons, valves) are like model parameters — they're designed and built to work together. But the driver adjusts hyperparameters like fuel mixture, ignition timing, and tire pressure to optimize performance for specific conditions (racing vs. city driving). The right hyperparameters make the car faster and more efficient; the wrong ones cause it to stall or waste fuel.

## Code Example

```python
# Hyperparameter tuning with Optuna (Bayesian Optimization)
import optuna
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification

# Generate synthetic data
X, y = make_classification(n_samples=10000, n_features=20, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Convert to PyTorch tensors
X_train = torch.tensor(X_train, dtype=torch.float32)
y_train = torch.tensor(y_train, dtype=torch.long)
X_val = torch.tensor(X_val, dtype=torch.float32)
y_val = torch.tensor(y_val, dtype=torch.long)

# Define a simple neural network
class SimpleNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, dropout):
        super().__init__()
        layers = []
        prev_size = input_size
        for _ in range(num_layers):
            layers.append(nn.Linear(prev_size, hidden_size))
            layers.append(nn.ReLU())
            layers.append(nn.Dropout(dropout))
            prev_size = hidden_size
        layers.append(nn.Linear(prev_size, 2))  # Binary classification
        self.network = nn.Sequential(*layers)
    
    def forward(self, x):
        return self.network(x)

# Define the objective function for Optuna
def objective(trial):
    # 1. Suggest hyperparameters to try
    hidden_size = trial.suggest_categorical('hidden_size', [64, 128, 256])
    num_layers = trial.suggest_int('num_layers', 1, 3)
    dropout = trial.suggest_float('dropout', 0.1, 0.5)
    learning_rate = trial.suggest_float('learning_rate', 1e-5, 1e-2, log=True)
    batch_size = trial.suggest_categorical('batch_size', [32, 64, 128])
    
    # 2. Build model with suggested hyperparameters
    model = SimpleNet(
        input_size=20,
        hidden_size=hidden_size,
        num_layers=num_layers,
        dropout=dropout
    )
    
    # 3. Train the model
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)
    criterion = nn.CrossEntropyLoss()
    
    train_loader = DataLoader(
        TensorDataset(X_train, y_train),
        batch_size=batch_size,
        shuffle=True
    )
    
    # Train for a fixed number of epochs (could also be a hyperparameter)
    for epoch in range(10):
        model.train()
        for batch_X, batch_y in train_loader:
            optimizer.zero_grad()
            outputs = model(batch_X)
            loss = criterion(outputs, batch_y)
            loss.backward()
            optimizer.step()
    
    # 4. Evaluate on validation set
    model.eval()
    with torch.no_grad():
        val_outputs = model(X_val)
        val_loss = criterion(val_outputs, y_val).item()
        val_accuracy = (val_outputs.argmax(dim=1) == y_val).float().mean().item()
    
    # 5. Return the metric to optimize (we want to maximize accuracy)
    return val_accuracy

# Create Optuna study
study = optuna.create_study(direction='maximize')

# Run optimization (try 50 different hyperparameter combinations)
study.optimize(objective, n_trials=50)

# Print best hyperparameters
print("\n=== Best Hyperparameters ===")
print(f"Validation Accuracy: {study.best_value:.4f}")
print(f"Hidden Size: {study.best_params['hidden_size']}")
print(f"Number of Layers: {study.best_params['num_layers']}")
print(f"Dropout: {study.best_params['dropout']:.4f}")
print(f"Learning Rate: {study.best_params['learning_rate']:.6f}")
print(f"Batch Size: {study.best_params['batch_size']}")

# Output example:
# === Best Hyperparameters ===
# Validation Accuracy: 0.9234
# Hidden Size: 128
# Number of Layers: 2
# Dropout: 0.2341
# Learning Rate: 0.000847
# Batch Size: 64

# Now train the final model with the best hyperparameters
best_model = SimpleNet(
    input_size=20,
    hidden_size=study.best_params['hidden_size'],
    num_layers=study.best_params['num_layers'],
    dropout=study.best_params['dropout']
)
# ... train on full dataset ...
```

## Common Misconceptions
- **Myth:** Hyperparameters are learned from data like model parameters.
- **Reality:** Hyperparameters are set *before* training and control the training process. Model parameters (weights) are learned *during* training from the data.

- **Myth:** Default hyperparameters are always good enough.
- **Reality:** Defaults are reasonable starting points, but tuning hyperparameters can significantly improve performance. For production models, tuning is essential.

- **Myth:** More hyperparameter tuning always leads to better models.
- **Reality:** Excessive tuning on the same validation set can lead to overfitting. There's a sweet spot: tune the most impactful hyperparameters, but don't over-optimize.

- **Myth:** Hyperparameter tuning is only for researchers.
- **Reality:** Every practitioner who trains ML models should tune hyperparameters. Automated tools like Optuna make it accessible and efficient, even for non-experts.

## Related Terms
- [Learning Rate](../learning-rate/)
- [Training](../training/)
- [Optimizer](../optimizer/)
- [Overfitting / Underfitting](../overfitting-underfitting/)

## Sources & Further Reading
- [Optuna: A Hyperparameter Optimization Framework](https://optuna.org/)
- [Random Search for Hyper-Parameter Optimization (Bergstra & Bengio)](https://www.jmlr.org/papers/v13/bergstra12a.html)
- [Practical Hyperparameter Tuning (Google ML Guide)](https://developers.google.com/machine-learning/guides/hyperparameters)
