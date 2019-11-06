export default interface ResourceService <T> {

    list():T[] | Promise<T[]>;

    add(resource:T):T | Promise<T>;

    remove(resource: T);

}