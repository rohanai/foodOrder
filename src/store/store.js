import PubSub from "../lib/pubSub";

export default class Store {
  constructor(params) {
    let self = this;
    this.events = new PubSub();
    this.actions = {};
    this.state = {};
    this.mutations = {};
    this.status = "resting";

    if (params.actions) {
      this.actions = params.actions;
    }

    if (params.mutations) {
      this.mutations = params.mutations;
    }

    this.state = new Proxy(params.state || {}, {
      set: function(state, key, val) {
        state[key] = val;

        if (self.status !== "mutating") {
          console.warn("please perform mutation");
          return false;
        }
        self.events.publish("updateLocalState", self.state);
        self.events.publish("changeState", self.state);
        self.status = "resting";
        return true;
      }
    });
  }

  dispatch(actionKey, payload) {
    let self = this;
    if (!self.actions.hasOwnProperty(actionKey)) {
      console.error(`No actionkey ${actionKey} found`);
      return false;
    }
    self.actions[actionKey](self, payload);
    self.status = "dispatch";
    return true;
  }

  committe(mutationKey, payload) {
    let self = this;
    if (!self.mutations.hasOwnProperty(mutationKey)) {
      console.error(`No mutation key ${mutationKey} found`);
      return false;
    }
    self.status = "mutating";
    let newState = self.mutations[mutationKey](self.state, payload);
    console.log("newState", newState);
    self.state = Object.assign(self.state, newState);
    return true;
  }
}
